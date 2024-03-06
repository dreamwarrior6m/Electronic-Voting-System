"use client";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AdminProtected from "@/Component/Protected/AdminProtected";

const ShowFeedback = () => {
  const { data: candidates = [], refetch } = useQuery({
    queryKey: ["candidates45"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/admin-feedback",{
        withCredentials: true,
      });
      return res.data;
    },
  });
  console.log(candidates);

  const handledeleted = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to fire this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deleted it!",
    }).then( async(result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(
          `https://evs-delta.vercel.app/admin-feedback/${id}`
        );
        if (res?.data?.deletedCount > 0) {
          Swal.fire({
            title: "fire!",
            text: `this message has been deleted.`,
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  return (
    <AdminProtected>
      <div>
        <div className="mt-5 text-indigo-200/100">
          <div className="overflow-x-auto">
            <table className="table font-semibold">
              {/* head */}
              <thead>
                <tr className="text-center text-md font-semibold  border-b-2 border-gray-600">
                  <th>
                    <label>
                      <p className="">No</p>
                    </label>
                  </th>
                  <th className=" ">Name</th>
                  <th className="">Email</th>
                  <th className="">Massage</th>
                  <th className="">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* map candidates to rows */}
                {candidates.map((candidate, index) => (
                  <tr
                    key={candidate.id}
                    className={`${
                      index % 2 === 1 ? "bg-blue-200/5 text-indigo-200/70" : "bg-blue-200/5 text-indigo-200/70"
                    } text-center font-semibold border-b border-indigo-200/50`}
                  >
                    <th>
                      <label>
                        <p className=" font-semibold text-center">
                          {index + 1}
                        </p>
                      </label>
                    </th>
                    <td className="">
                      <div className="flex items-center justify-center gap-3">
                        <div className="avatar"></div>
                        <div>
                          <div className="font-bold">
                            {candidate.userName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{candidate.email}</td>
                    <td>{candidate.feedback}</td>
                    <td className="text-3xl cursor-pointer">
                      <button onClick={() => handledeleted(candidate._id)}>
                        <MdDeleteForever className=" text-red-700" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default ShowFeedback;


