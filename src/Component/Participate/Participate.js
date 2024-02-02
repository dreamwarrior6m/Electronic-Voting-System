/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

const Participate = () => {
  const [allCandidate, setAllCandidate] = useState();
  const [selectCandidateId, setSelectCandidateId] = useState();
  const [showVote, setShowVote] = useState();
  const [voterEmail, setVoterEmail] = useState();
  const { id } = useParams();
  const [user] = useAuthState(auth);
  console.log(id);
  const updateVoterEmail2 = user?.email;
  const updateVoterEmail = { updateVoterEmail2 };
  console.log(updateVoterEmail);

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
            console.log(res);
            // setVoterEmail(...oldVoterEmail , [user])

            //add voter gmail
            // axios
            //   .patch(
            //     `https://evs-delta.vercel.app/create-vote/${id}`,
            //     updateVoterEmail
            //   )
            //   .then((res) => {
            //     console.log("update voter", res);
                
            //   })
            //   .catch((err) => {
            //     console.error("not update vorer", err);
            //   });
          })
          .catch((err) => {
            console.error(err);
          });
      });
  };

  return (
    <div className="text-white p-5">
      {filterCandidate?.map((candidat, ind) => (
        <>
          <div key={candidat._id} className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">{candidat?.candidateName}</span>
              <input
                onClick={() => handalCountVote(candidat?._id)}
                type="radio"
                name="radio-10"
                className="radio checked:bg-blue-500"
              />
            </label>
          </div>{" "}
        </>
      ))}
      <div className="">
        <button onClick={() => handaleAddVote()} className="btn btn-primary">
          submit
        </button>
      </div>
    </div>
  );
};

export default Participate;
