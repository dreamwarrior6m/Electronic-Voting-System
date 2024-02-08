"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ElectionDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { data: elections = [], refetch } = useQuery({
    queryKey: ["electionsDetails"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/create-vote");
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
        <h2>
          <span className="font-bold">Current Status: </span>{" "}
          {isSystemRunning ? "Running" : "Stopped"}
        </h2>
      </div>
    );
  };

  return (
    <div>
      <div>
        <h3 className="text-4xl font-bold text-center py-3">
          {filterElection[0]?.OrganizatonName} Election Details
        </h3>
      </div>
      <h4 className="text-3xl font-bold py-2">All Info:</h4>
      <div className="text-2xl font font-medium">
        {filterElection?.map((election, index) => (
          <div key={election?._id}>
            <div className="">
              <p>
                <span className="font-bold">Organization Name: </span>
                {election?.OrganizatonName}
              </p>
              <p>
                <span className="font-bold">Election Name: </span>
                {election?.name}
              </p>
              <Timer
                startDate1={`${election?.startDate}T${election?.startTime}`}
                endDate1={`${election?.endDate}T${election?.endTime}`}
              />
              <p>
                <span className="font-bold">Email: </span> {election?.email}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <h4 className="text-3xl font-bold mb-5">All Candidate:</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filterCandidate?.map((candidate, index) => (
            <div
              key={candidate?._id}
              className={`${
                index % 2 === 0 ? "bg-gray-100 rounded-xl" : "bg-white"
              } text-center font-semibold rounded-xl`}
            >
              <div>
                <Image
                  src={candidate?.candidatePhoto}
                  width={150}
                  height={150}
                  alt="Image"
                  className="rounded-xl w-full h-auto md:h-[340px]"
                />
              </div>
              <div className="py-4">
                <h2 className="">Name: {candidate?.candidateName}</h2>
                <h2 className="">Email: {candidate?.candidateEmail}</h2>
                <h2 className="">Id: {candidate?.candidateID}</h2>
                <div className="">
                  <button className="">More Info</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h4 className="text-3xl font-bold">All Voter:</h4>
      </div>
    </div>
  );
};

export default ElectionDetails;
