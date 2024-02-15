"use client";
import AllVoter from "@/app/dashboard/allVoter/page";
import useAuth from "@/app/hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { MdDeleteForever, MdVerified } from "react-icons/md";
import Swal from "sweetalert2";

const ElectionDetails = () => {
  const { id } = useParams();
  const { data: elections = [],  } = useQuery({
    queryKey: ["electionsDetails"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/create-vote");
      return res.data;
    },
  });
  const {user} = useAuth()
  const CandidateEmail = user?.email
  console.log(CandidateEmail)
  const { data: Voter = [], refetch } = useQuery({
    queryKey: ["CandidateEmail"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/candidate/under/${CandidateEmail}`);
      return res.data;
    },
  });

  const handleVerify = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/candidateUnderVoter/verify/${id}`
      );
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    } catch (error) {
      console.error("Error:", error);
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
          `http://localhost:5000/candidateUnderVoter/${id}`
        );

        if (res.data.deletedCount > 0) {
          refetch()

          Swal.fire({
            title: "Deleted!",
            text: "This voter has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };
  const { data: candidates = [] } = useQuery({
    queryKey: ["candidates1"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/candidate");
      return res.data;
    },
  });
  const filterElection = elections?.filter((election) => election?._id === id);

  const filterCandidate = candidates?.filter(
    (candidate) => candidate?.voteName === filterElection[0]?.name
  );

  const Timer = ({ startDate1, endDate1 }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isSystemRunning, setSystemRunning] = useState(false);

    // Check if the system should start or stop
    useEffect(() => {
      const startDateTime = new Date(startDate1).getTime();
      const endDateTime = new Date(endDate1).getTime();

      if (
        currentTime.getTime() >= startDateTime &&
        currentTime.getTime() <= endDateTime
      ) {
        // Start the system
        setSystemRunning(true);
      } else {
        // Stop the system
        setSystemRunning(false);
      }
    }, [currentTime, startDate1, endDate1]);

    // Update the current time every second
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      // Cleanup function to clear the interval when the component is unmounted
      return () => clearInterval(timer);
    }, []);

    return (
      <div>
        <h2>
          <span className="font-bold">Current Status: </span>{" "}
          {isSystemRunning ? "Running" : "Stopped"}
        </h2>
      </div>
    );
  };

  return (
    <div>
      <div>
        <h3 className="text-4xl font-bold text-center py-3">
          {filterElection[0]?.OrganizatonName} Election Details
        </h3>
      </div>
      <h4 className="text-3xl font-bold py-2">All Info:</h4>
      <div className="text-2xl font font-medium">
        {filterElection?.map((election, index) => (
          <div key={election?._id}>
            <div className="">
              <p>
                <span className="font-bold">Organization Name: </span>
                {election?.OrganizatonName}
              </p>
              <p>
                <span className="font-bold">Election Name: </span>
                {election?.name}
              </p>
              <Timer
                startDate1={`${election?.startDate}T${election?.startTime}`}
                endDate1={`${election?.endDate}T${election?.endTime}`}
              />
              <p>
                <span className="font-bold">Email: </span> {election?.email}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <h4 className="text-3xl font-bold mb-5">All Candidate:</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filterCandidate?.map((candidate, index) => (
            <div
              key={candidate?._id}
              className={`${
                index % 2 === 0 ? "bg-gray-100 rounded-xl" : "bg-white"
              } text-center font-semibold rounded-xl`}
            >
              <div>
                <Image
                  src={candidate?.candidatePhoto}
                  width={150}
                  height={150}
                  alt="Image"
                  className="rounded-xl w-full h-auto md:h-[340px]"
                />
              </div>
              <div className="py-4">
                <h2 className="">Name: {candidate?.candidateName}</h2>
                <h2 className="">Email: {candidate?.candidateEmail}</h2>
                <h2 className="">Id: {candidate?.candidateID}</h2>
                <div className="">
                  <button className="">More Info</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
      <div>
      <p className="font-bold text-center text-2xl text-black">
       CreateVote Under voters : {Voter?.length}
      </p>
      <hr className="w-96 mx-auto h-2 mb-3 mt-1 bg-gradient-to-r from-blue-500 to-green-500"></hr>

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
              <th>Email</th>
              <th>Verify</th>
              <th>Action</th>
              
            </tr>
          </thead>
          <tbody>
            {Voter?.map((vote, index) => (
              <tr
                key={vote._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } text-center font-semibold border-b border-gray-600`}
              >
                <th>
                  <label>
                    <p className="text-black">{index + 1}</p>
                  </label>
                </th>
                <td>{vote.name}</td>
                <td>{vote.email}</td>
                <td>
                  <button onClick={() => handleVerify(vote._id)}>
                    {vote?.verify == "true" ? (
                      <MdVerified className="text-3xl text-green-600 text-center ml-5 cursor-pointer" />
                    ) : (
                      <ImCross className="text-xl text-red-700 text-center ml-5 cursor-pointer" />
                    )}
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
      </div>
    </div>
  );
};

export default ElectionDetails;
