"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/Component/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/app/hook/useAuth";

const Page = () => {
  const { id } = useParams();
  console.log(id);
  const { user } = useAuth();

  const { data: userRoles = [], refetch } = useQuery({
    queryKey: ["userRoles12"],
    queryFn: async () => {
      const res = await axios.get(
        `https://evs-delta.vercel.app/users/${user?.email}`
      );
      return res.data;
    },
    refetchInterval: 1000,
  });

  console.log(userRoles?.isRole);

  const { data: showAllVote = [] } = useQuery({
    queryKey: ["showAllElectons"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/create-vote");
      return res.data;
    },
    refetchInterval: 1000,
  });

  // console.log(showAllVote);
  const filterModeratorElections = showAllVote?.filter(
    (election) => election?.email == user?.email
  );
  console.log(filterModeratorElections);

  const { data: applyForCandidate = [] } = useQuery({
    queryKey: ["candidates479"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/candidate");
      return res.data;
    },
    refetchInterval: 1000,
  });

  // FilterApplyCandidate
  const candidateApply = applyForCandidate?.filter(
    (candidate) => candidate.candidateEmail === user?.email
  );
  console.log("get Candidate", candidateApply);

  const { data: applyForVoter = [] } = useQuery({
    queryKey: ["Voter4829"],
    queryFn: async () => {
      const res = await axios.get(
        "https://evs-delta.vercel.app/CandiateUnderUser"
      );
      return res.data;
    },
    refetchInterval: 1000,
  });

  const voterApply = applyForVoter?.filter(
    (candidate) => candidate.candidateEmail === user?.email
  );
  console.log("get Voter", voterApply);

  const filterAllVote = showAllVote.filter((allVot) => allVot?.name == id);
  console.log(filterAllVote);

  return (
    <div className="min-h-screen max-w-7xl mx-auto pt-14">
      <div className="text-white pt-10 md:px-8 px-3">
        <h1 className=" text-2xl text-center font-semibold mb-5   lg:text-4xl">
          Name: {filterAllVote[0]?.OrganizatonName}{" "}
        </h1>

        <div className=" bg-gray-800 rounded-md">
          <div className=" card flex md:flex-row justify-center items-center">
            <div className="flex justify-center mx-auto items-center">
              <div className="grid-cols-1 justify-between items-center lg:flex gap-32">
                <figure className="px-10 pt-10">
                  <Image
                    src={filterAllVote[0]?.photo}
                    alt="alt"
                    width={300}
                    height={300}
                    className="rounded-lg"
                  />
                </figure>
                <div className="flex items-center justify-center py-6 md:py-0">
                  <div className="mb-5">
                    <h2 className="text-xl  font-bold">
                      Type: {filterAllVote[0]?.Type}
                    </h2>
                    <h2 className="text-green-400 text-xl   font-bold">
                      Start: {filterAllVote[0]?.startDate} (
                      {filterAllVote[0]?.startTime})
                    </h2>
                    <h2 className=" text-red-400 text-xl  font-bold">
                      End: {filterAllVote[0]?.endDate} (
                      {filterAllVote[0]?.endTime})
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" lg:mt-20 pb-8">
            {userRoles?.isRole === "Admin" ? (
              <div className=" lg:mt-20 flex  gap-2 justify-center items-center pb-8">
              <Link
                href={`/participate/${filterAllVote?.[0].name}`}
                className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
              >
                Participate
              </Link>
              {/* <Link href={`/show-all-vote/candidate`}  className="btn btn-sm"> Candidates</Link> */}
              <Link
                href={`/show-all-vote/${filterAllVote?.[0].name}`}
                className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
              >
                Candidates
              </Link>
              <Link
                href={`/result/${filterAllVote?.[0].name}`}
                className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
              >
                result
              </Link>
    
              <Link
                href={`/share/${filterAllVote?.[0].name}`}
                className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
              >
                Share
              </Link>
            </div>
            ) : userRoles?.isRole === "Modarator" ? (
              filterModeratorElections?.length > 0 &&
              filterModeratorElections?.find(
                (voteName) => voteName.name === filterAllVote[0]?.name
              ) ? (
                <div className="flex justify-center items-center text-center mt-2">
                  <Link href={`/details/${filterAllVote[0]?.name}`} className="w-full">
                    <button className="text-[16px] border py-3 border-green-500 rounded-md hover:bg-green-200 w-full">
                      See Details
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 mt-2">
                  {candidateApply?.find(
                    (voteName) => voteName.voteName === filterAllVote[0]?.name
                  ) &&
                  candidateApply?.find(
                    (verify) => verify.isverify === "true"
                  ) ? (
                    ""
                  ) : candidateApply?.find(
                      (voteName) => voteName.voteName === filterAllVote[0]?.name
                    ) &&
                    candidateApply?.find(
                      (verify) => verify.isverify === "false"
                    ) ? (
                    <button className="text-[16px] border py-3 border-red-500 rounded-md hover:bg-red-200 ">
                      Candidate In Process
                    </button>
                  ) : (
                    <Modal
                      electionId={filterAllVote[0]?._id}
                      buttonName={"Apply for a candidate"}
                      type={2}
                    />
                  )}

                  {voterApply?.find(
                    (voteName) => voteName.voteName === filterAllVote[0]?.name
                  ) &&
                  voterApply?.find((verify) => verify.isverify === "true") ? (
                    ""
                  ) : voterApply?.find(
                      (voteName) => voteName.voteName === filterAllVote[0]?.name
                    ) &&
                    voterApply?.find(
                      (verify) => verify.isverify === "false"
                    ) ? (
                    <button className="text-[16px] border py-3 border-red-500 rounded-md hover:bg-red-200 ">
                      Voter In Process
                    </button>
                  ) : (
                    <Modal
                      electionId={filterAllVote[0]?._id}
                      buttonName={"Apply for a voter"}
                      type={1}
                    />
                  )}

                  {(voterApply?.find(
                    (voteName) => voteName.voteName === filterAllVote[0]?.name
                  ) &&
                    voterApply?.find((verify) => verify.isverify === "true")) ||
                  (candidateApply?.find(
                    (voteName) => voteName.voteName === filterAllVote[0]?.name
                  ) &&
                    candidateApply?.find(
                      (verify) => verify.isverify === "true"
                    )) ? (
                      <div className=" lg:mt-20 flex  gap-2 justify-center items-center pb-8">
                      <Link
                        href={`/participate/${filterAllVote?.[0].name}`}
                        className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                      >
                        Participate
                      </Link>
                      {/* <Link href={`/show-all-vote/candidate`}  className="btn btn-sm"> Candidates</Link> */}
                      <Link
                        href={`/show-all-vote/${filterAllVote?.[0].name}`}
                        className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                      >
                        Candidates
                      </Link>
                      <Link
                        href={`/result/${filterAllVote?.[0].name}`}
                        className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                      >
                        result
                      </Link>
            
                      <Link
                        href={`/share/${filterAllVote?.[0].name}`}
                        className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                      >
                        Share
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )
            ) : userRoles?.isRole === "user" ? (
              <div className="flex flex-col space-y-2 mt-2">
                {candidateApply?.find(
                  (voteName) => voteName.voteName === filterAllVote[0]?.name
                ) &&
                candidateApply?.find((verify) => verify.isverify === "true") ? (
                  ""
                ) : candidateApply?.find(
                    (voteName) => voteName.voteName === filterAllVote[0]?.name
                  ) &&
                  candidateApply?.find(
                    (verify) => verify.isverify === "false"
                  ) ? (
                  <button className="text-[16px] border py-3 border-red-500 rounded-md hover:bg-red-200 ">
                    Candidate In Process
                  </button>
                ) : (
                  <Modal
                    electionId={filterAllVote[0]?._id}
                    buttonName={"Apply for a candidate"}
                    type={2}
                  />
                )}

                {voterApply?.find(
                  (voteName) => voteName.voteName === filterAllVote[0]?.name
                ) &&
                voterApply?.find((verify) => verify.isverify === "true") ? (
                  ""
                ) : voterApply?.find(
                    (voteName) => voteName.voteName === filterAllVote[0]?.name
                  ) &&
                  voterApply?.find((verify) => verify.isverify === "false") ? (
                  <button className="text-[16px] border py-3 border-red-500 rounded-md hover:bg-red-200 ">
                    Voter In Process
                  </button>
                ) : (
                  <Modal
                    electionId={filterAllVote[0]?._id}
                    buttonName={"Apply for a voter"}
                    type={1}
                  />
                )}
                {(voterApply?.find(
                  (voteName) => voteName.voteName === filterAllVote[0]?.name
                ) &&
                  voterApply?.find((verify) => verify.isverify === "true")) ||
                (candidateApply?.find(
                  (voteName) => voteName.voteName === filterAllVote[0]?.name
                ) &&
                  candidateApply?.find(
                    (verify) => verify.isverify === "true"
                  )) ? (
                    <div className=" lg:mt-20 flex  gap-2 justify-center items-center pb-8">
                    <Link
                      href={`/participate/${filterAllVote?.[0].name}`}
                      className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                    >
                      Participate
                    </Link>
                    {/* <Link href={`/show-all-vote/candidate`}  className="btn btn-sm"> Candidates</Link> */}
                    <Link
                      href={`/show-all-vote/${filterAllVote?.[0].name}`}
                      className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                    >
                      Candidates
                    </Link>
                    <Link
                      href={`/result/${filterAllVote?.[0].name}`}
                      className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                    >
                      result
                    </Link>
          
                    <Link
                      href={`/share/${filterAllVote?.[0].name}`}
                      className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
                    >
                      Share
                    </Link>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
