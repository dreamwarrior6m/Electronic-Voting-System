"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Protected from "../Protected/Protected";
import { IoShareSocialOutline } from "react-icons/io5";
import Modal from "../Modal/Modal";
import { VscUnverified } from "react-icons/vsc";
import useAuth from "@/app/hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ModaProtected from "../Protected/ModaProtected";

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
      <h2>Position: {isSystemRunning ? "Running" : "Stopped"}</h2>
    </div>
  );
};

//time end

const ShowAllvote = () => {
  const [showAllVote, setShowAllVote] = useState();
  useEffect(() => {
    fetch("https://evs-delta.vercel.app/create-vote")
      .then((res) => res.json())
      .then((data) => {
        setShowAllVote(data);
      });
  }, []);
  // console.log(showAllVote);

  const mapAllVote = showAllVote?.filter((allVote) => allVote?.startDate);
  // console.log(mapAllVote)
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const [data, setdata] = useState([]);
  const { user } = useAuth();
  const handleOpenModal = async (id) => {
    setModalOpen(true);
    const res = await axios.get(
      `https://evs-delta.vercel.app/create-vote/${id}`
    );
    setdata(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const name = form.name.value;
      const email = form.email.value;
      const candidate = form.candidate.value;
      const isverify = false;
      const CandidateEmail = data?.email;
      const Type = data?.Type;
      const feedback = form.feedback.value;
      const formData = {
        name,
        email,
        candidate,
        isverify,
        CandidateEmail,
        Type,
        feedback,
      };

      console.log("Form Data:", formData);

      const res = await axios.post(
        `https://evs-delta.vercel.app/candidate/under/users`,
        formData
      );
      console.log("Server Response:", res.data);
      s;
      handleModalClose(); // Close modal after form submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Protected>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5  m-5 rounded-lg ">
        {showAllVote?.map((allVote, ind) => (
          <div key={allVote._id}>
            <div className="card  text-black shadow-xl hover:shadow-2xl bg-slate-300 w-3/4  ">
              <div className="card-body  ">
                <h2 className="text-3xl font-bold text-center mb-5">
                  {allVote?.OrganizatonName}
                  <div className="mx-auto">
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
                  </div>
                </h2>
                <p className="font-bold">Vote name: {allVote?.name}</p>
                {/* start time */}
                <span className="font-bold">
                  {" "}
                  <Timer
                    startDate1={`${allVote?.startDate}T${allVote?.startTime}`}
                    endDate1={`${allVote?.endDate}T${allVote?.endTime}`}
                  />
                </span>
                {/* end time */}

                <div className="flex gap-20">
                  <div>
                    <h2 className="text-green-600 font-bold">
                      Start: {allVote?.startDate} ({allVote?.startTime})
                    </h2>
                    <h2 className="text-red-600 font-bold">
                      End: {allVote?.endDate} ({allVote?.endTime})
                    </h2>
                    <button
                      onClick={() => handleOpenModal(allVote._id)}
                      className=" btn btn-sm btn-primary flex justify-center items-center text-lg border    w-full mt-2 mb-2  "
                    >
                      {" "}
                      <VscUnverified />{" "}
                      <span className="text-[16px]">Verify now </span>
                    </button>

                    <Link
                      href={`/details/${allVote?.name}`}
                      className="btn btn-sm btn-primary text-black hover:btn-primary w-full"
                    >
                      {" "}
                      Details
                    </Link>
                  </div>
                </div>
                {/* <p>Email: {allVote?.email}</p> */}
                {/* <p>Voter Email: {allVote?.voterEmail}</p> */}
                <div className="card-actions grid grid-cols-2 justify-end">
                  {/* <Link
                    href={`/participate/${allVote?.name}`}
                    className="btn btn-sm btn-primary hover:bg-slate-300"
                  >
                    Participate
                  </Link> */}
                  {/* <Link href={`/show-all-vote/candidate`}  className="btn btn-sm"> Candidates</Link> */}
                  {/* <Link
                    href={`/show-all-vote/${allVote?.name}`}
                    className="btn btn-sm btn-primary text-black  hover:bg-slate-300"
                  >
                    {" "}
                    Candidates
                  </Link> */}
                  {/* <Link
                    href={`/result/${allVote?.name}`}
                    className="btn btn-sm bg-white text-black hover:btn-primary"
                  >
                    {" "}
                    result
                  </Link> */}
                  {/* <Link
                    href={`share/${allVote?.name}`}
                    className="btn btn-sm bg-white text-black hover:btn-primary"
                  >
                    <IoShareSocialOutline />
                    Share
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Protected>
  );
};

export default ShowAllvote;
