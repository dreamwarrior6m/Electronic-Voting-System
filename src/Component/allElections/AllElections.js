"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
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

const AllElections = () => {
  // const { user } = useAuth();
  // const { data: userRoles = [], refetch } = useQuery({
  //   queryKey: ["userRoles12"],
  //   queryFn: async () => {
  //     const res = await axios.get(
  //       `https://evs-delta.vercel.app/users/${user?.email}`
  //     );
  //     return res.data;
  //   },
  //   refetchInterval: 1000,
  // });

  // console.log(userRoles?.isRole);

  const { data: showAllVote = [] } = useQuery({
    queryKey: ["showAllElectons"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/create-vote");
      return res.data;
    },
    refetchInterval: 1000,
  });
  console.log(showAllVote);

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-4 md:px-6 px-4 py-6 md:py-8 lg:py-12 ">
        {showAllVote?.map((allVote, ind) => (
          <div key={allVote._id} className="h-full">
            <div className=" text-white/80 rounded-md drop-shadow-xl hover:shadow-2xl bg-blue-200/5 border-2  border-gray-100/20 p-5 h-full">
              <div className="flex justify-center items-center">
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
              </div>
              <div className="flex justify-center items-center text-center mt-2">
                <Link href={`/details/${allVote?.name}`} className=" w-3/6">
                  <button className="text-[16px] border  border-gray-100/20 py-[9px] rounded-md hover:bg-white/80 hover:text-gray-800 w-full">
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllElections;
