"use client"
import { MdDeleteForever } from "react-icons/md";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MdVerified } from "react-icons/md";
import ReactPaginate from "react-paginate";
import './styles.css'
import { useRole } from "@/Component/Tanstackquery";
import { ROOT_DIR_ALIAS } from "next/dist/lib/constants";

const AllVoter = () => {
  const [voters, setVoters] = useState([]);
  const [limit, setLimit] = useState(5);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef(1);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setVoters(data));
  }, []);
  // const {Role,refetch}= useRole()
  // console.log(Role)

  const handleVerify = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/users/verify/${id}`);
    } catch (error) {
      console.error('Error:', error);
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
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(`http://localhost:5000/users/${id}`);

        if (res.data.deletedCount > 0) {
          setVoters((prevVotes) => prevVotes.filter((vote) => vote._id !== id));

          Swal.fire({
            title: "Deleted!",
            text: "This voter has been deleted.",
            icon: "success"
          });
        }
      }
    });
  };
  // pagination
  
  useEffect(() => {
    getPaginatedUsers();
  }, []);

  const handlePageClick = (e) => {
    currentPage.current = e.selected + 1;
    getPaginatedUsers();
  };

  const changeLimit = () => {
    currentPage.current = 1;
    getPaginatedUsers();
  };

  const getPaginatedUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/paginatedUsers?page=${currentPage.current}&limit=${limit}`
      );

      setPageCount(response.data.pageCount);
      setVoters(response.data.result);
    } catch (error) {
      console.error('Error fetching paginated users:', error);
    }
  };

  return (
    <div>
      <p className="font-bold text-center text-2xl text-black">
        Total Voters: {voters.length}
      </p>
      <hr className="w-52 mx-auto h-2 mb-3 mt-1 bg-gradient-to-r from-blue-500 to-green-500"></hr>

      <div className="overflow-x-auto">
        <table className="table text-black">
          <thead>
            <tr className="text-xl font-semibold text-center border-b-2 border-gray-500">
              <th>
                <label>
                  <p className="">Number</p>
                </label>
              </th>
              <th>Name</th>
              <th>ID Card Number</th>
              <th>Email</th>
              <th>Date</th>
              <th>Verify</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {voters?.map((vote, index) => (
              <tr key={vote._id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} text-center font-semibold border-b border-gray-600`}>
                <th>
                  <label>
                    <p className="text-black">{index + 1}</p>
                  </label>
                </th>
                <td>{vote.name}</td>
                <td>{vote.idNumber}</td>
                <td>{vote.email}</td>
                <td>{vote.date}</td>
                <td>
                  <button onClick={() => handleVerify(vote._id)}>
                    {
                      vote?.verify == 'true'?<MdVerified className="text-3xl text-green-600 text-center ml-5 cursor-pointer" />:<ImCross className="text-xl text-red-700 text-center ml-5 cursor-pointer" />
                    }
                  </button>
                </td>
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
         <div className="flex items-center justify-between mt-4">
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
          forcePage={currentPage.current - 1}
        />
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">
              Page {currentPage.current} of {pageCount}
            </span>
            <input
              className="p-2 border border-gray-400 rounded-md"
              placeholder="Limit"
              onChange={(e) => setLimit(e.target.value)}
            />
            <button
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={changeLimit}
            >
              Set Limit
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default AllVoter;
