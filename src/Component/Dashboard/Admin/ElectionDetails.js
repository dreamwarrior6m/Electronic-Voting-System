"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

  const filterElection = elections?.filter((election) => election?._id === id);
  console.log(filterElection);

  return (
    <div>
      <div>
        <h3 className="text-3xl font-bold text-gray-700 text-center py-3">
          {filterElection[0]?.OrganizatonName} Election Details
        </h3>
      </div>
      <div className="text-2xl font font-medium">
        {filterElection?.map((election, index) => (
          <div key={election?._id}>
            <div className="">
              <p>{election?.OrganizatonName}</p>
              <p>{election?.name}</p>
              <Timer
                startDate1={`${election?.startDate}T${election?.startTime}`}
                endDate1={`${election?.endDate}T${election?.endTime}`}
              />
              <p>Email: {election?.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectionDetails;
