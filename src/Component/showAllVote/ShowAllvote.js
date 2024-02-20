"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Protected from "../Protected/Protected";
import Modal from "../Modal/Modal";


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

const ShowAllvote = () => {
  const [showAllVote, setShowAllVote] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/create-vote")
      .then((res) => res.json())
      .then((data) => {
        setShowAllVote(data);
      });
  }, []);
  // console.log(showAllVote);

  const mapAllVote = showAllVote?.filter((allVote) => allVote?.startDate);
  // console.log(mapAllVote)

  return (
    <Protected>
      <div className="grid lg:grid-cols-3 gap-4 py-6 md:py-8 lg:py-12 ">
        {showAllVote?.map((allVote, ind) => (
          <div key={allVote._id}>
            <div className=" text-black rounded-xl shadow-xl hover:shadow-2xl bg-slate-300 p-5 flex justify-center items-center">
              <div className="">
                <div className="flex gap-8 text-center">
                  <h2 className="text-green-600 font-medium text-sm">
                    Vote Casting Start <br /> {allVote?.startDate} (
                    {allVote?.startTime})
                  </h2>
                  <h2 className="text-red-600 font-medium text-sm">
                    Vote Casting End <br /> {allVote?.endDate} (
                    {allVote?.endTime})
                  </h2>
                </div>
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

                <div className="flex flex-col space-y-2 my-2">
                  <Modal
                    electionId={allVote._id}
                    buttonName={"Apply for a Candidate"}
                    type={2}
                  />
                  <Modal
                    electionId={allVote._id}
                    buttonName={"Apply for a voter"}
                    type={1}
                  />
                </div>

                <div className="flex justify-center items-center text-center">
                  <Link
                    href={`/details/${allVote?.name}`}
                    className="text-lg border border-green-500 px-2 py-1 rounded-md hover:bg-green-200 w-full"
                  >
                    Details
                  </Link>
                </div>
              </div>
              <div className="card-actions grid grid-cols-2 justify-end"></div>
            </div>
          </div>
        ))}
      </div>
    </Protected>
  );
};

export default ShowAllvote;
