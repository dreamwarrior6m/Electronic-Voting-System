/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import Image from "next/image"
import Swal from "sweetalert2";

const Participate = () => {
  const [allCandidate, setAllCandidate] = useState();
  const [selectCandidateId, setSelectCandidateId] = useState();
  const [showVote, setShowVote] = useState();
  const [voterEmail, setVoterEmail] = useState();
  const [participate, setParticipate] = useState();
  const { id } = useParams();
  const [user] = useAuthState(auth);
  console.log(id);
  const updateVoterEmail2 = user?.email;
  const updateVoterEmail = { updateVoterEmail2 };
  console.log(updateVoterEmail);

  const updateParticipate = { email: user?.email, voteName: id };
  console.log(updateParticipate);

  useEffect(() => {
    fetch("https://evs-delta.vercel.app/candidate")
      .then((res) => res.json())
      .then((data) => {
        setAllCandidate(data);
      });
  }, []);
  // console.log(allCandidate);

  useEffect(() => {
    fetch(`https://evs-delta.vercel.app/create-vote/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setShowVote(data);
      });
  }, [id]);

  //participate get data
  useEffect(()=>{
fetch('https://evs-delta.vercel.app/participate')
.then(res=> res.json())
.then(data=>{
  setParticipate(data);
})
  },[])
  console.log(participate);

  console.log(showVote?.voterEmail);
  const oldVoterEmail = showVote?.voterEmail;
  console.log(voterEmail);

  const filterCandidate = allCandidate?.filter(
    (candidate) => candidate?.voteName === id
  );
  console.log(filterCandidate);

  const handalCountVote = (id) => {
    // console.log(id);
    setSelectCandidateId(id);
  };
 
  const handaleAddVote = async () => {
    // console.log(candidat?.adminEmail);

    fetch(`https://evs-delta.vercel.app/candidate/${selectCandidateId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Voted successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(res);
            // participate api update
            // axios.post(
            //   "https://evs-delta.vercel.app/participate",
            //   updateParticipate
            // )
            // .then((res) => {
            //   console.log("partcipate", res);
            // })
            // .catch((err) => {
            //   console.error("participate", err);
            // })

          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "You already voted!",
              showConfirmButton: false,
              timer: 1500,
            });
          });

      });
  };

  return (
    <div className="text-white p-5">
      {filterCandidate?.map((candidat, ind) => (
        <>
          <div key={candidat._id} className="form-control w-[50%] mx-auto">
            <label className="label cursor-pointer">
              <span className="label-text">
                <Image className=" rounded-full" src={candidat?.candidatePhoto} alt="alt" width={100} height={100} />
                </span>
              <span className="label-text">Name: {candidat?.candidateName}</span>
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
      <div className="text-center pt-5">
        <button onClick={() => handaleAddVote()} className="btn btn-primary">
          submit
        </button>
      </div>
    </div>
  );
};

export default Participate;
