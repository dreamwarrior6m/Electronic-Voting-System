"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Protected from "@/Component/Protected/Protected";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";

const ShowElections = () => {
  const { data: elections = [], refetch } = useQuery({
    queryKey: ["elections1"],
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
        <h2>
          {" "}
          <span className="font-bold">Current Status:</span>{" "}
          {isSystemRunning ? "Running" : "Stopped"}
        </h2>
      </div>
    );
  };


  // Delete Function Added
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/create-vote/${id}`).then((res) => {
      console.log(res.data);
      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: "Successfully",
          text: "Deleted",
          icon: "success",
          confirmButtonText: "oky",
        });
        refetch()
      }
    });
  }

  return (
    <Protected>
      <div>
        <div>
          <h3 className="text-3xl font-bold text-gray-700 text-center pt-2 pb-6">
            All Elections
          </h3>
        </div>
        <div className="grid lg:grid-cols-3 gap-5 ">
          {elections?.map((election, index) => (
            <div
              key={election._id}
              className={`${
                index % 2 === 0 ? "bg-gray-100 rounded-xl" : "bg-white"
              } text-center font-semibold rounded-xl`}
            >
              <div className="grid py-5 items-center space-y-1">
                <p className="text-black text-3xl">{index + 1}</p>
                <p className="text-4xl">{election?.OrganizatonName}</p>
                <p className="text-xl">
                  <span className="font-bold">Election Name: </span>
                  {election?.name}
                </p>
                <Timer
                  startDate1={`${election?.startDate}T${election?.startTime}`}
                  endDate1={`${election?.endDate}T${election?.endTime}`}
                />
                <div className="pb-1">
                  <button onClick={() => handleDelete(election._id)} className="bg-red-500 text-white px-4 py-[10px] rounded-md mr-2">
                    <MdDelete />
                  </button>
                  <button className="bg-green-500 text-white px-4 py-[10px] rounded-md">
                    <MdEdit />
                  </button>
                </div>
                <Link href={`/dashboard/allElections/${election._id}`}>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-md">
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Protected>
  );
};

export default ShowElections;
