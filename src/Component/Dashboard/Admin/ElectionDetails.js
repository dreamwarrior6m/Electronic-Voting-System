"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { MdVerified } from "react-icons/md";
import Swal from "sweetalert2";
import ElectionInfo from "./components/ElectionInfo";
import ElectionCandidate from "./components/ElectionCandidate";

const ElectionDetails = () => {
  const { id } = useParams();
  const { data: elections = [] } = useQuery({
    queryKey: ["electionsDetails"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/create-vote");
      return res.data;
    },
  });
  console.log(elections);
  const filterElection = elections?.filter((election) => election?._id === id);
  console.log("Election: ", filterElection);

  // console.log(CandidateEmail);
  const { data: Voter = [], refetch } = useQuery({
    queryKey: ["CandidateEmail"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/candidate/under/users/${filterElection[0]?.name}`
      );
      return res.data;
    },
    refetchInterval: 1000,
  });
  console.log("All Applied: ", Voter);

  const handleCandidateVerify = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/candidate/verify/${id}`
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Verify",
          text: "This candidate has been Verified.",
          icon: "success",
        });
        refetch();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleVerify = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/candidateUnderVoter/verify/${id}`
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Verify",
          text: "This voter has been Verified.",
          icon: "success",
        });
        refetch();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCandidateDelete = async (id) => {
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
          `http://localhost:5000/candidate/${id}`
        );

        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "This Candidate has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
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
          Swal.fire({
            title: "Deleted!",
            text: "This voter has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };
  const { data: candidates = [] } = useQuery({
    queryKey: ["candidates1"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/candidate");
      return res.data;
    },
    refetchInterval: 1000,
  });
  const filterCandidate = candidates?.filter(
    (candidate) => candidate?.voteName === filterElection[0]?.name
  );

  console.log(filterElection);

  return (
    <div className="text-white">
      {/* ELection Name */}
      <div>
        <h3 className="text-4xl font-bold text-center py-3">
          {filterElection[0]?.OrganizatonName} Election Details
        </h3>
      </div>

      {/* Election Info */}
      <div className="py-2">
        <h4 className="text-3xl font-bold ">All Info:</h4>
        <div className="text-2xl font font-medium">
          {filterElection?.map((election) => (
            <ElectionInfo
              key={election?._id}
              election={election}
              refetch={refetch}
            ></ElectionInfo>
          ))}
        </div>
      </div>

      {/* Election Candidates */}
      <div className="mt-10">
        <h4 className="text-3xl font-bold mb-5">All Candidate:</h4>
        <div className="grid md:grid-cols-2  lg:grid-cols-4 gap-5">
          {filterCandidate?.map((candidate, index) => (
            <ElectionCandidate
              key={candidate?._id}
              index={index}
              candidate={candidate}
              refetch={refetch}
            ></ElectionCandidate>
          ))}
        </div>
      </div>

      {/* All Voter */}
      <div className="grid grid-cols-2 gap-2">
        <div className="mt-10">
          <div>
            <p className="font-bold text-center text-2xl  ">
              All Candidate : {filterCandidate?.length}
            </p>
            <hr className="w-96 mx-auto h-2 mb-3 mt-1 bg-gradient-to-r from-blue-500 to-green-500"></hr>

            <div className="overflow-x-auto p-6 pb-12">
              <table className="table text-black">
                <thead>
                  <tr className="text-md font-semibold text-center border-b-2 border-gray-500">
                    <th>
                      <label>
                        <p className="">Number</p>
                      </label>
                    </th>
                    {/* <th>Name</th> */}
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterCandidate?.map((candidate, index) => (
                    <tr
                      key={candidate._id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } text-center font-semibold border-b border-gray-600`}
                    >
                      <th>
                        <label>
                          <p className="text-black">{index + 1}</p>
                        </label>
                      </th>
                      {/* <td>{candidate.candidateName}</td> */}
                      <td>{candidate.candidateEmail}</td>
                      <td>
                        <div>
                          {candidate?.isverify == "true" ? (
                            <MdVerified className="text-3xl text-green-600 text-center ml-5 cursor-pointer" />
                          ) : (
                            <div className="flex gap-2">
                              <button
                                className="bg-green-500 text-white px-2 py-1 rounded-sm"
                                onClick={() =>
                                  handleCandidateVerify(candidate._id)
                                }
                              >
                                Accept
                              </button>
                              <button
                                className="bg-red-500 text-white px-2 py-1 rounded-sm"
                                onClick={() =>
                                  handleCandidateDelete(candidate._id)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div>
            <p className="font-bold text-center text-2xl  ">
              All Candidate : {Voter?.length}
            </p>
            <hr className="w-96 mx-auto h-2 mb-3 mt-1 bg-gradient-to-r from-blue-500 to-green-500"></hr>

            <div className="overflow-x-auto p-6 pb-12">
              <table className="table text-black">
                <thead>
                  <tr className="text-md font-semibold text-center border-b-2 border-gray-500">
                    <th>
                      <label>
                        <p className="">Number</p>
                      </label>
                    </th>
                    {/* <th>Name</th> */}
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Voter?.map((voter, index) => (
                    <tr
                      key={voter._id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } text-center font-semibold border-b border-gray-600`}
                    >
                      <th>
                        <label>
                          <p className="text-black">{index + 1}</p>
                        </label>
                      </th>
                      {/* <td>{candidate.candidateName}</td> */}
                      <td>{voter.candidateEmail}</td>
                      <td>
                        <div>
                          {voter?.isverify == "true" ? (
                            <MdVerified className="text-3xl text-green-600 text-center ml-5 cursor-pointer" />
                          ) : (
                            <div className="flex gap-2">
                              <button
                                className="bg-green-500 text-white px-2 py-1 rounded-sm"
                                onClick={() => handleVerify(voter._id)}
                              >
                                Accept
                              </button>
                              <button
                                className="bg-red-500 text-white px-2 py-1 rounded-sm"
                                onClick={() => handleDelete(voter._id)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionDetails;
