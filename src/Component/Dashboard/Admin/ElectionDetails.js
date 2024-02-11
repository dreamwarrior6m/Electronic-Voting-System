"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ElectionInfo from "./components/ElectionInfo";
import ElectionCandidate from "./components/ElectionCandidate";

const ElectionDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { data: elections = [], refetch } = useQuery({
    queryKey: ["electionsDetails"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/create-vote");
      return res.data;
    },
  });
  console.log(elections);

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
  console.log(filterCandidate);

  return (
    <div>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
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
      <div className="mt-10">
        <h4 className="text-3xl font-bold">All Voter:</h4>
      </div>
    </div>
  );
};

export default ElectionDetails;
