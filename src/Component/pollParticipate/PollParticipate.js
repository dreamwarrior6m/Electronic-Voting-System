"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import useAuth from "@/app/hook/useAuth";
import Swal from "sweetalert2";

const PollParticipate = () => {
  const [pollAns, setPollAns] = useState();
  const [createPoll, setCreatePoll] = useState();
  const [pollAnsId, setPollAnsId] = useState();
  const [pollParticipate, setPollParticipate] = useState();
  const { id } = useParams();
  // console.log(id);
  const { user } = useAuth();
  // console.log(user?.email);
  const participateUser = { pollUserName: id, email: user?.email };
  console.log(participateUser);

  useEffect(() => {
    axios
      .get("https://evs-delta.vercel.app/poll-ans")
      .then((res) => {
        setPollAns(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://evs-delta.vercel.app/create-poll")
      .then((res) => {
        setCreatePoll(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  console.log(pollAns);
  const filterPollAns = pollAns?.filter((poll) => poll?.userName == id);
  console.log(filterPollAns);

  const filterCreatePoll = createPoll?.filter(
    (crPoll) => crPoll?.userName == id
  );
  console.log(filterCreatePoll);

  useEffect(() => {
    axios
      .get("https://evs-delta.vercel.app/poll-participate")
      .then((res) => {
        // console.log(res?.data);
        setPollParticipate(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  console.log(pollParticipate);
  const filterPollParticipate = pollParticipate?.filter(
    (participate) =>
      participate?.email == user?.email && participate?.pollUserName == id
  );
  console.log(filterPollParticipate);

  const handleCoutnVote = (id) => {
    setPollAnsId(id);
  };

  const handaleAddVote = () => {
    console.log(pollAnsId);
    if (filterPollParticipate?.[0]?.email != user?.email) {
      axios
        .get(`https://evs-delta.vercel.app/poll-ans/${pollAnsId}`)
        .then((res) => {
          console.log(res?.data);
          const voteCount = res?.data?.pollVoteCount;
          const updataVoteCount = voteCount + 1;
          const updatePollCount = { updataVoteCount };
          console.log(updatePollCount);

          axios
            .patch(
              `https://evs-delta.vercel.app/poll-ans/${pollAnsId}`,
              updatePollCount
            )
            .then((res) => {
              console.log("update vote", res?.data);

              axios
                .post(
                  "https://evs-delta.vercel.app/poll-participate",
                  participateUser
                )
                .then((res) => {
                  console.log("participate post", res?.data);
                })
                .catch((err) => {
                  console.error(err);
                });
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "You already voted",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="text-white min-h-screen">
      <div className="text-white p-5  pt-12">
        <div className="bg-gray-800 md:w-3/4 mx-auto rounded-md">
          <div className="">
            <h2 className="text-center font-bold text-3xl py-5 pb-5">
              {filterCreatePoll?.[0]?.title}
            </h2>
          </div>
          {filterPollAns?.map((pollAns, ind) => (
            <>
              <div
                key={pollAns._id}
                className="form-control md:w-[50%] mx-auto "
              >
                <label className="label cursor-pointer">
                  <span className="label-text">
                    <Image
                      className=" rounded-full"
                      src={pollAns?.questionPhoto}
                      alt="alt"
                      width={100}
                      height={100}
                    />
                  </span>
                  <span className="">{pollAns?.question}</span>
                  <span>Vote: {pollAns?.pollVoteCount}</span>
                  <input
                    onClick={() => handleCoutnVote(pollAns?._id)}
                    type="radio"
                    name="radio-10"
                    className="radio checked:bg-blue-500"
                  />
                </label>
                <hr></hr>
              </div>
            </>
          ))}
          <div className="text-center p-2">
            <button
              onClick={() => handaleAddVote()}
              className="btn btn-primary"
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollParticipate;
