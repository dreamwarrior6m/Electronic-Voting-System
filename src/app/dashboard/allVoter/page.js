"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { MdDeleteForever, MdVerified } from "react-icons/md";
import ReactPaginate from "react-paginate";
import "./styles.css";
import { useQuery } from "@tanstack/react-query";
import AdminProtected from "@/Component/Protected/AdminProtected";
import Swal from "sweetalert2";

const AllVoter = () => {
  const [voters, setVoters] = useState([]);
  const [limit, setLimit] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/users", {
        withCredentials: true,
        params: { page: currentPage, limit },
      });
      setVoters(res.data);
      setPageCount(res.data.pageCount);
      return res.data;
    },
  });

  useEffect(() => {
    getPaginatedUsers();
  }, [currentPage]);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  const changeLimit = () => {
    setCurrentPage(1);
    getPaginatedUsers();
  };

  const getPaginatedUsers = async () => {
    try {
      const response = await axios.get(
        `https://evs-delta.vercel.app/paginatedUsers?page=${currentPage}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );

      setPageCount(response.data.pageCount);
      setVoters(response.data.result);
    } catch (error) {
      console.error("Error fetching paginated users:", error);
    }
  };

  // const handleVerify = async (id) => {
  //   try {
  //     const res = await axios.patch(
  //       `https://evs-delta.vercel.app/users/verify/${id}`
  //     );
  //     if (res.data.modifiedCount > 0) {
  //       refetch();
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleRole = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want make admin this user",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I do!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.patch(
            `https://evs-delta.vercel.app/users/isRole/${id}`
          );
          if (res.data.modifiedCount > 0) {
            setVoters((prevVoters) =>
        prevVoters.map((voter) =>
          voter._id === id ? { ...voter, isRole: "admin" } : voter
        ));
            Swal.fire({
              title: "Admin",
              text: "This voter has been Admin.",
              icon: "success",
            });
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

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
          `https://evs-delta.vercel.app/users/${id}`
        );

        if (res.data.deletedCount > 0) {
          setVoters((prevVotes) => prevVotes.filter((vote) => vote._id !== id));

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
    <AdminProtected>
      <div>
        <div className="overflow-x-auto mt-3">
          <table className="table text-gray-900 mt-4">
            <thead className="text-white">
              <tr className="text-md font-semibold text-center border-b-2 border-gray-500">
                <th>
                  <label>
                    <p className="">Number</p>
                  </label>
                </th>
                <th>Name</th>
                <th>ID Card Number</th>
                <th>Email</th>
                <th>Role</th>
                {/* <th>Verify</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {voters?.map((vote, index) => (
                <tr
                  key={vote._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100/90" : "bg-gray-100/80"
                  } text-center font-semibold border-b border-gray-300`}
                >
                  <th>
                    <label>
                      <p className="text-black">{(currentPage - 1) * limit + index + 1}</p>
                    </label>
                  </th>
                  <td>{vote.name}</td>
                  <td>{vote.idNumber}</td>
                  <td>{vote.email}</td>
                  <td className=" ">
                    <button
                      className=" bg-[#441760] px-2 py-1 mt-1 text-gray-300 rounded"
                      onClick={() => handleRole(vote._id)}
                    >
                      {vote.isRole}
                    </button>
                  </td>
                  {/* <td>
                    <button onClick={() => handleVerify(vote._id)}>
                      {vote?.verify == "true" ? (
                        <MdVerified className="text-3xl text-green-600 text-center ml-5 cursor-pointer" />
                      ) : (
                        <ImCross className="text-xl text-red-700 text-center ml-5 cursor-pointer" />
                      )}
                    </button>
                  </td> */}
                  <td className="text-3xl cursor-pointer">
                    <button onClick={() => handleDelete(vote._id)}>
                      <MdDeleteForever className=" text-red-700" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {
          <div className="md:flex items-center justify-between mt-4">
            <ReactPaginate
              breakLabel={<span className="break-label">...</span>}
              nextLabel={<span className="pagination-icon">&rarr;</span>}
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel={<span className="pagination-icon">&larr;</span>}
              renderOnZeroPageCount={null}
              marginPagesDisplayed={2}
              containerClassName="pagination-container"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              activeClassName="active"
              forcePage={currentPage - 1}
            />
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">
                Page {currentPage} of {pageCount}
              </span>
              <input
                className="p-2 border border-gray-400 rounded-md"
                placeholder="Limit"
                onChange={(e) => setLimit(e.target.value)}
              />
              <button
                className="ml-2 bg-blue-500 text-white md:px-4 px-2 md:py-2 py-1 rounded-md"
                onClick={changeLimit}
              >
                Set Limit
              </button>
            </div>
          </div>
        }
      </div>
    </AdminProtected>
  );
};

export default AllVoter;
