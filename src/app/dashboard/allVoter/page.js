"use client";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Image from "next/image";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import axios from "axios";


const Page = () => {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    fetch("https://evs-server.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setVoters(data));
  }, []);
 const handledeleted =(id)=>{
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to fire this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Deleted it!"
}).then(async (result) => {
    if (result.isConfirmed) {
        const res =await axios.delete(`https://evs-server.vercel.app/users/${id}`)
        if (res.data.deletedCount > 0) {
          setVoters((prevotes)=>prevotes.filter((votes)=>votes._id!==id))
            Swal.fire({
                title: "fire!",
                text: `this voter has been deleted.`,
                icon: "success"
            });
        }
    }
});
 }
  return (
   <div>
   <p className="font-bold text-center text-2xl text-black">
  Total Voters: {voters.length}
</p>
<hr className="w-52 mx-auto h-2 mb-3 mt-1 bg-gradient-to-r from-blue-500 to-green-500"></hr>

  

     <div className="overflow-x-auto">
    <table className="table text-black">
      <thead>
        <tr className=" text-xl font-semibold text-center border-b-2 border-gray-500">
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
          <tr key={vote.id} className={`${
            index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
          } text-center font-semibold border-b border-gray-600`}>
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
            <ImCross className="text-xl text-center ml-5 cursor-pointer" />
            </td>
            <td className="text-3xl cursor-pointer"><button onClick={()=>handledeleted(vote._id)}><MdDeleteForever /></button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
   </div>
  );
};

export default Page;