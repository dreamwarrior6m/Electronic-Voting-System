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
  const updateVoterEmail = { updateVoterEmail2 };
  // console.log(updateVoterEmail);

  const updateParticipate = { email: user?.email, voteName: id };
  // console.log(updateParticipate);

  useEffect(() => {
    axios
      .get("http://localhost:5000/CandiateUnderUser")
      .then((res) => {
        setCandidateUnderUser(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  console.log(candidateUnderUser);

  const filterUndreUser = candidateUnderUser?.filter(
    (underUser) => underUser?.candidate == id && underUser?.email == user?.email
  );
  console.log(filterUndreUser);

  useEffect(() => {
    fetch("http://localhost:5000/candidate")
      .then((res) => res.json())
      .then((data) => {
        setAllCandidate(data);
      });
  }, []);
  // console.log(allCandidate);

  // useEffect(() => {
  //   fetch(`http://localhost:5000/create-vote/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setShowVote(data);
  //     });
  // }, [id]);

  //participate get data

  const { data, refetch } = useQuery({
    queryKey: ["participate"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/participate");
      setParticipate(res?.data);
      return res?.data;
    },
  });

  // useEffect(() => {
  //   fetch("http://localhost:5000/participate")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setParticipate(data);
  //     });
  // }, []);
  // console.log(participate);

  // console.log(showVote?.voterEmail);
  // const oldVoterEmail = showVote?.voterEmail;
  // console.log(voterEmail);

  const filterCandidate = allCandidate?.filter(
    (candidate) => candidate?.voteName == id
  );
  // console.log(filterCandidate);

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
      filterUndreUser?.[0]?.isverify == "true"
    ) {
      fetch(`http://localhost:5000/candidate/${selectCandidateId}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          const updateVot = data?.voteCount;
          const updateVoteCount2 = updateVot + 1;
          const updateVoteCount = { updateVoteCount2 };
          // console.log(updateVoteCount);

          // add vote number
          axios
            .patch(
              `http://localhost:5000/candidate/${selectCandidateId}`,
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
                .post("http://localhost:5000/participate", updateParticipate)
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
      <div className="text-white p-5">
        {filterCandidate?.map((candidat, ind) => (
          <>
            <div key={candidat._id} className="form-control md:w-[50%] mx-auto">
              <label className="label cursor-pointer">
                <span className="label-text">
                  <Image
                    className=" rounded-full"
                    src={candidat?.candidatePhoto}
                    alt="alt"
                    width={100}
                    height={100}
                  />
                </span>
                <span className="label-text">
                  Name: {candidat?.candidateName}
                </span>
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
          filterCandidate?.length == 0 ? (
            <button
              disabled
              onClick={() => handaleAddVote()}
              className="btn btn-primary"
            >
              You already voted
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
