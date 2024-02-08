"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Protected from "../Protected/Protected";
import { IoShareSocialOutline } from "react-icons/io5";

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
      <h2>Position: {isSystemRunning ? "Running" : "Stopped"}</h2>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 bg-white m-5 rounded-lg">
        {showAllVote?.map((allVote, ind) => (
          <div key={allVote._id} className="">
            <div className="card  text-black shadow-xl hover:shadow-2xl bg-slate-300 ">
              <div className="card-body  ">
                <h2 className="text-3xl font-bold text-center mb-5">
                  {allVote?.OrganizatonName}
                </h2>
                <p className="font-bold">Vote name: {allVote?.name}</p>

                {/* start time */}
                <span className="font-bold">
                  {" "}
                  <Timer
                    startDate1={`${allVote?.startDate}T${allVote?.startTime}`}
                    endDate1={`${allVote?.endDate}T${allVote?.endTime}`}
                  />
                </span>
                {/* end time */}

                <div className="">
                  <h2 className="text-green-600 font-bold">
                    Start: {allVote?.startDate} ({allVote?.startTime})
                  </h2>
                  <h2 className="text-red-600 font-bold">
                    End: {allVote?.endDate} ({allVote?.endTime})
                  </h2>
                </div>
                {/* <p>Email: {allVote?.email}</p> */}
                {/* <p>Voter Email: {allVote?.voterEmail}</p> */}
                <div className="card-actions grid grid-cols-2 justify-end">
                  <Link
                    href={`/participate/${allVote?.name}`}
                    className="btn btn-sm btn-primary hover:bg-slate-300"
                  >
                    Participate
                  </Link>
                  {/* <Link href={`/show-all-vote/candidate`}  className="btn btn-sm"> Candidates</Link> */}
                  <Link
                    href={`/show-all-vote/${allVote?.name}`}
                    className="btn btn-sm btn-primary text-black  hover:bg-slate-300"
                  >
                    {" "}
                    Candidates
                  </Link>
                  <Link
                    href={`/result/${allVote?.name}`}
                    className="btn btn-sm bg-white text-black hover:btn-primary"
                  >
                    {" "}
                    result
                  </Link>
                  <Link
                    href={`share/${allVote?.name}`}
                    className="btn btn-sm bg-white text-black hover:btn-primary"
                  >
                    <IoShareSocialOutline />
                    Share
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Protected>
  );
};

export default ShowAllvote;
