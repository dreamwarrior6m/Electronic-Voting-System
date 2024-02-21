"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Protected from "../Protected/Protected";
import Modal from "../Modal/Modal";
import useAuth from "@/app/hook/useAuth";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// time start
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
      <h2 className="font-bold text-sm mt-2">
        {isSystemRunning ? "Running.." : "Start Soon.."}
      </h2>
    </div>
  );
};

//time end

const ShowAllVote = () => {
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

  return (
    <Protected>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5  m-5 rounded-lg md:mt-18 mt-14">
        {showAllVote?.map((allVote, ind) => (
          <div key={allVote._id}>
            <div className="card  text-black shadow-xl hover:shadow-2xl bg-slate-300 w-3/4  mt-2 ">
              <div className="card-body  ">
                <h2 className="text-3xl font-bold text-center mb-5">
                  {allVote?.OrganizatonName}
                  <div className="mx-auto">
                    <Modal electionId={allVote._id} buttonName={"Apply for a voter"} />
                    {/* <button
                      onClick={() => handleOpenModal(allVote._id)}
                      className="flex justify-center items-center text-lg border border-green-500 px-2 py-1 rounded-xl hover:bg-green-200 gap-1"
                    >
                      {" "}
                      <VscUnverified />{" "}
                      <span className="text-[16px]">Verify now</span>
                    </button> */}

                    {modalOpen && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                        <div className=" relative mt-10 p-8 rounded bg-gray-900 text-white shadow-lg w-full sm:max-w-md">
                          <button
                            className="absolute top-0 right-0 p-2 text-red-400"
                            onClick={handleModalClose}
                          >
                            X
                          </button>
                          <h2 className="text-2xl font-bold mb-4">
                            Verify Voter From
                          </h2>
                          <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                              <label
                                htmlFor="name"
                                className=" mb-2 text-xl font-normal"
                              >
                                Voter Name:
                              </label>
                              <input
                                type="text"
                                disabled
                                defaultValue={user?.displayName}
                                id="name"
                                name="name"
                                className="w-full px-3 border-none text-black bg-gray-200 rounded-lg text-xl font-normal foucs:bg-gray-400"
                              />
                            </div>

                            <div className="mb-4">
                              <label
                                htmlFor="email"
                                className="mb-2 text-xl font-normal"
                              >
                                Email:
                              </label>
                              <input
                                type="email"
                                id="email"
                                disabled
                                defaultValue={user?.email}
                                name="email"
                                className="w-full px-3 border-none text-black bg-gray-200 rounded-lg text-xl font-normal foucs:bg-gray-400"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="candidate"
                                className=" mb-2 text-xl font-normal"
                              >
                                Under Candidate:
                              </label>
                              <input
                                type="text"
                                id=""
                                disabled
                                defaultValue={data?.name}
                                name="candidate"
                                className="w-full px-3 border-none text-black bg-gray-200 rounded-lg text-xl font-normal foucs:bg-gray-400"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="candidate"
                                className=" mb-2 text-xl font-normal"
                              >
                                Please Enter your feedback:
                              </label>
                              <input
                                type="text"
                                id=""
                                name="feedback"
                                className="w-full px-3 border-none text-black bg-gray-200 rounded-lg text-xl font-normal foucs:bg-gray-400"
                              />
                            </div>

                            <button
                              type="submit"
                              className="btn btn-outline text-white"
                            >
                              Submit
                            </button>
                          </form>
                        </div>
                      </div>
                    )}

      <div className="grid lg:grid-cols-3 gap-4 py-6 md:py-8 lg:py-12 ">
        {showAllVote?.map((allVote, ind) => (
          <div key={allVote._id} className="h-full">
            <div className=" text-black rounded-xl shadow-xl hover:shadow-2xl bg-slate-300 p-5 flex justify-center items-center h-full">
              <div className="">
                <div className="flex gap-8 text-center justify-center">
                  <h2 className="text-green-600 font-medium text-sm">
                    Vote Casting Start <br /> {allVote?.startDate} (
                    {allVote?.startTime})
                  </h2>
                  <h2 className="text-red-600 font-medium text-sm">
                    Vote Casting End <br /> {allVote?.endDate} (
                    {allVote?.endTime})
                  </h2>
                </div>
                <div className="pb-1 text-center">
                  <h2 className="text-3xl font-bold text-center mb-2">
                    <span className="text-base font-normal">
                      Organization Name
                    </span>
                    <br /> {allVote?.OrganizatonName}
                    <div className="mx-auto"></div>
                  </h2>
                  <div className="text-center">
                    <p className="font-bold text-2xl -mt-[5px]">
                      <span className="text-base font-normal">
                        Election Name
                      </span>
                      <br /> {allVote?.name}
                    </p>

                  </div>
                  <Timer
                    startDate1={`${allVote?.startDate}T${allVote?.startTime}`}
                    endDate1={`${allVote?.endDate}T${allVote?.endTime}`}
                  />
                </div>
                {userRoles?.isRole === "Admin" ? (
                  <div className="flex justify-center items-center text-center mt-2">
                    <Link href={`/details/${allVote?.name}`} className="w-full">
                      <button className="text-[16px] border py-3 border-green-500 rounded-md hover:bg-green-200 w-full">
                        See Details
                      </button>
                    </Link>
                  </div>
                ) : userRoles?.isRole === "Modarator" ? (
                  filterModeratorElections?.length > 0 &&
                  filterModeratorElections?.find(
                    (voteName) => voteName.name === allVote?.name
                  ) ? (
                    <div className="flex justify-center items-center text-center mt-2">
                      <Link
                        href={`/details/${allVote?.name}`}
                        className="w-full"
                      >
                        <button className="text-[16px] border py-3 border-green-500 rounded-md hover:bg-green-200 w-full">
                          See Details
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2 mt-2">
                      {candidateApply?.find(
                        (voteName) => voteName.voteName === allVote?.name
                      ) &&
                      candidateApply?.find(
                        (verify) => verify.isverify === "true"
                      ) ? (
                        ""
                      ) : candidateApply?.find(
                          (voteName) => voteName.voteName === allVote?.name
                        ) &&
                        candidateApply?.find(
                          (verify) => verify.isverify === "false"
                        ) ? (
                        <button className="text-[16px] border py-3 border-red-500 rounded-md hover:bg-red-200 w-full">
                          Candidate In Process
                        </button>
                      ) : (
                        <Modal
                          electionId={allVote._id}
                          buttonName={"Apply for a candidate"}
                          type={2}
                        />
                      )}

                      {voterApply?.find(
                        (voteName) => voteName.voteName === allVote?.name
                      ) &&
                      voterApply?.find(
                        (verify) => verify.isverify === "true"
                      ) ? (
                        ""
                      ) : voterApply?.find(
                          (voteName) => voteName.voteName === allVote?.name
                        ) &&
                        voterApply?.find(
                          (verify) => verify.isverify === "false"
                        ) ? (
                        <button className="text-[16px] border py-3 border-red-500 rounded-md hover:bg-red-200 w-full">
                          Voter In Process
                        </button>
                      ) : (
                        <Modal
                          electionId={allVote._id}
                          buttonName={"Apply for a voter"}
                          type={1}
                        />
                      )}

                      {(voterApply?.find(
                        (voteName) => voteName.voteName === allVote?.name
                      ) &&
                        voterApply?.find(
                          (verify) => verify.isverify === "true"
                        )) ||
                      (candidateApply?.find(
                        (voteName) => voteName.voteName === allVote?.name
                      ) &&
                        candidateApply?.find(
                          (verify) => verify.isverify === "true"
                        )) ? (
                        <div className="flex justify-center items-center text-center mt-2">
                          <Link
                            href={`/details/${allVote?.name}`}
                            className="w-full"
                          >
                            <button className="text-[16px] border py-3 border-green-500 rounded-md hover:bg-green-200 w-full">
                              See Details
                            </button>
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
                      (voteName) => voteName.voteName === allVote?.name
                    ) &&
                    candidateApply?.find(
                      (verify) => verify.isverify === "true"
                    ) ? (
                      ""
                    ) : candidateApply?.find(
                        (voteName) => voteName.voteName === allVote?.name
                      ) &&
                      candidateApply?.find(
                        (verify) => verify.isverify === "false"
                      ) ? (
                      <button className="text-[16px] border py-3 border-red-500 rounded-md hover:bg-red-200 w-full">
                        Candidate In Process
                      </button>
                    ) : (
                      <Modal
                        electionId={allVote._id}
                        buttonName={"Apply for a candidate"}
                        type={2}
                      />
                    )}

                    {voterApply?.find(
                      (voteName) => voteName.voteName === allVote?.name
                    ) &&
                    voterApply?.find((verify) => verify.isverify === "true") ? (
                      ""
                    ) : voterApply?.find(
                        (voteName) => voteName.voteName === allVote?.name
                      ) &&
                      voterApply?.find(
                        (verify) => verify.isverify === "false"
                      ) ? (
                      <button className="text-[16px] border py-3 border-red-500 rounded-md hover:bg-red-200 w-full">
                        Voter In Process
                      </button>
                    ) : (
                      <Modal
                        electionId={allVote._id}
                        buttonName={"Apply for a voter"}
                        type={1}
                      />
                    )}
                    {(voterApply?.find(
                      (voteName) => voteName.voteName === allVote?.name
                    ) &&
                      voterApply?.find(
                        (verify) => verify.isverify === "true"
                      )) ||
                    (candidateApply?.find(
                      (voteName) => voteName.voteName === allVote?.name
                    ) &&
                      candidateApply?.find(
                        (verify) => verify.isverify === "true"
                      )) ? (
                      <div className="flex justify-center items-center text-center mt-2">
                        <Link
                          href={`/details/${allVote?.name}`}
                          className="w-full"
                        >
                          <button className="text-[16px] border py-3 border-green-500 rounded-md hover:bg-green-200 w-full">
                            See Details
                          </button>
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
        ))}
      </div>
    </Protected>
  );
};

export default ShowAllVote;