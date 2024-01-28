"use client"
import { MdDeleteForever } from "react-icons/md";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";

const AllVoter = () => {
  const [voters, setVoters] = useState([]);
  const[toggle, settoggle]= useState(false)

  useEffect(() => {
    // Fetch the list of voters when the component mounts
    fetch("https://evs-server.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setVoters(data));
  }, []);

  const handleVerify = async (id) => {
    try {
      const res = await axios.patch(`https://evs-server.vercel.app/users/verify/${id}`);
      settoggle(res.data.message)
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
        // Send a DELETE request to remove the specific voter
        const res = await axios.delete(`https://evs-server.vercel.app/users/${id}`);

        if (res.data.deletedCount > 0) {
          // Update the local state to remove the deleted voter
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
    </div>
  );
};

export default AllVoter;
