/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { useParams } from "next/navigation";
import useAuth from "@/app/hook/useAuth";

const allPoll = () => {
  const { user } = useAuth();
  // console.log(user?.email);
  const [allPoll, setAllPoll] = useState();
  const { data, refetch } = useQuery({
    queryKey: ["create-poll"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/create-poll");
      setAllPoll(res?.data);
      return res?.data;
    },
  });
  // console.log(allPoll);
  const filterMyPoll = allPoll?.filter(
    (myPoll) => myPoll?.wonerEmail == user?.email
  );
  console.log(filterMyPoll);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(
          `https://evs-delta.vercel.app/create-poll/${id}`
        );
        if (res.data.deletedCount > 0) {
          setAllPoll((prevPoll) => prevPoll.filter((vote) => vote._id !== id));

          Swal.fire({
            title: "Deleted!",
            text: "This voter has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="text-white">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Owner</th>
              <th>View</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filterMyPoll?.map((poll, ind) => (
              <tr key={poll?._id}>
                <th>{ind + 1}</th>
                <td>{poll?.title}</td>
                <td>{poll?.wonerEmail}</td>
                <td>
                  <Link href={`/poll-participate/${poll?.userName}`}>Show</Link>
                </td>
                <th>
                  <button
                    onClick={() => handleDelete(poll?._id)}
                    className=" text-red-500 text-2xl"
                  >
                    <MdDeleteForever />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default allPoll;
