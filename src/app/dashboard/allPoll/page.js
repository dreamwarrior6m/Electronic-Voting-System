/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import AdminProtected from "@/Component/Protected/AdminProtected";
import useAuth from "@/app/hook/useAuth";
import ReactPaginate from "react-paginate";
import './styles.css'

const allPoll = () => {
  const [allPoll, setAllPoll] = useState();
  const { id } = useParams();
  const {user} = useAuth();
  const { data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/create-poll", {
        withCredentials: true,
      });
      setAllPoll(res.data);
      return res.data;
    },
  });

  const handleDelete = async (id, receiverEmail, title) => {
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
    const type = 6;
    const notification = {
      senderEmail: user?.email,
      receiverEmail: receiverEmail,
      type,
      electionName: title,
    };

    axios
      .post("https://evs-delta.vercel.app/notification", notification)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <AdminProtected>
      <div className="text-white/85">
        <div className="overflow-x-auto">
          <table className="table table-zebra text-md font-semibold">
            {/* head */}
            <thead className="">
              <tr>
                <th></th>
                <th>Title</th>
                <th>Owner</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allPoll?.map((poll, ind) => (
                <tr key={poll?._id} >
                  <th>{ind + 1}</th>
                  <td>{poll?.title}</td>
                  <td>{poll?.wonerEmail}</td>
                  <td>
                    <Link href={`/poll-participate/${poll?.userName}`}>
                      Show
                    </Link>
                  </td>
                  <th>
                    <button
                      onClick={() => handleDelete(poll?._id, poll?.wonerEmail, poll?.title)}
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
    </AdminProtected>
  );
};

export default allPoll;
