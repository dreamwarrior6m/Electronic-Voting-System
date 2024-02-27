/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Protected from "../Protected/Protected";

const Participate = () => {
  const [allCandidate, setAllCandidate] = useState();
  const [selectCandidateId, setSelectCandidateId] = useState();
  // const [showVote, setShowVote] = useState();
  const [voterEmail, setVoterEmail] = useState();
  const [participate, setParticipate] = useState();
  const [candidateUnderUser, setCandidateUnderUser] = useState();
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const router = useRouter();
  console.log(id);
  const updateVoterEmail2 = user?.email;
  console.log(user?.email);
  const updateVoterEmail = { updateVoterEmail2 };
  // console.log(updateVoterEmail);

  const updateParticipate = { email: user?.email, voteName: id };
  // console.log(updateParticipate);

  //  all election filter
  const [allElections, setAllElections] = useState();
  useEffect(() => {
    axios
      .get("https://evs-delta.vercel.app/create-vote?search")
      .then((res) => {
        setAllElections(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  console.log(allElections);
  const filterAllElections = allElections?.filter(
    (election) => election?.name == id
  );
  console.log(filterAllElections?.[0]?.position);

  useEffect(() => {
    axios
      .get("https://evs-delta.vercel.app/CandiateUnderUser", {
        withCredentials: true,
      })
      .then((res) => {
        setCandidateUnderUser(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  console.log(candidateUnderUser);

  const filterUndreUser = candidateUnderUser?.filter(
    (underUser) =>
      underUser?.voteName == id && underUser?.candidateEmail == user?.email
  );
  // console.log(filterUndreUser);

  useEffect(() => {
    axios
      .get("https://evs-delta.vercel.app/candidate", { withCredentials: true })
      .then((res) => {
        setAllCandidate(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const { data, refetch } = useQuery({
    queryKey: ["participate"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/participate", {
        withCredentials: true,
      });
      setParticipate(res?.data);
      return res?.data;
    },
  });

  const filterCandidate = allCandidate?.filter(
    (candidate) => candidate?.voteName == id && candidate?.isverify == "true"
  );
  console.log(filterCandidate);

  const handalCountVote = (id) => {
    // console.log(id);
    setSelectCandidateId(id);
  };

  const filterParticipet = participate?.filter(
    (participat) =>
      participat?.email === user?.email && participat?.voteName === id
  );
  // console.log(filterParticipet?.[0]?.email);

  const handaleAddVote = async () => {
    // console.log(candidat?.adminEmail);

    if (
      filterParticipet?.[0]?.email != user?.email &&
      filterUndreUser?.[0]?.isverify == "true" &&
      filterAllElections?.[0]?.position == true
    ) {
      fetch(`https://evs-delta.vercel.app/candidate/${selectCandidateId}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          const updateVot = data?.voteCount;
          const updateVoteCount2 = updateVot + 1;
          const updateVoteCount = { updateVoteCount2 };
          console.log(updateVoteCount);

          // add vote number
          axios
            .patch(
              `https://evs-delta.vercel.app/candidate/${selectCandidateId}`,
              updateVoteCount
            )
            .then((res) => {
              refetch();
              router.push(`/result/${id}`);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Voted successfully",
                showConfirmButton: false,
                timer: 1500,
              });

              // console.log(res);
              // participate api update
              axios
                .post(
                  "https://evs-delta.vercel.app/participate",
                  updateParticipate
                )
                .then((res) => {
                  console.log("partcipate", res);
                })
                .catch((err) => {
                  console.error("participate", err);
                });
            })
            .catch((err) => {
              // console.error(err);
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "You are not verified user",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              // console.error(err);
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "You are not verified user",
                showConfirmButton: false,
                timer: 1500,
              });
            });
        });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "You are not verified user",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Protected>
      <div className="text-white p-5 min-h-screen">
        <div className="flex justify-center gap-32">
          {filterCandidate?.length != 0 && (
            <h2 className="text-center text-xl md:text-3xl font-bold p-5">
              Choose your favorite person
            </h2>
          )}
        </div>
        {filterCandidate?.map((candidat, ind) => (
          <>
            <div
              key={candidat._id}
              className="form-control md:w-[50%] mx-auto py-2"
            >
              <label className="label cursor-pointer">
                <span className="label-text">
                  <Image
                    className=" w-24 h-24 rounded-full object-cover"
                    src={candidat?.candidatePhoto}
                    alt="alt"
                    width={100}
                    height={100}
                  />
                </span>
                <span className="label-text">{candidat?.candidateName}</span>
                <input
                  onClick={() => handalCountVote(candidat?._id)}
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-500"
                />
              </label>
              <hr></hr>
            </div>
          </>
        ))}
        <div className="">
          {filterCandidate?.length == 0 && (
            <h2 className="text-center text-xl md:text-3xl font-bold p-5">
              No candidate partcipate
            </h2>
          )}
        </div>
        <div className="text-center pt-5">
          {filterParticipet?.[0]?.email == user?.email ||
          filterAllElections?.[0]?.position == false ||
          filterCandidate?.length == 0 ? (
            <button disabled className="btn btn-primary">
              submit
            </button>
          ) : (
            <button
              onClick={() => handaleAddVote()}
              className="btn btn-primary"
            >
              submit
            </button>
          )}
        </div>
      </div>
    </Protected>
  );
};

export default Participate;
