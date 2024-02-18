"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Protected from "@/Component/Protected/Protected";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "@/app/hook/useAuth";

const ShowElections = () => {
  const { user } = useAuth();
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
        <h2 className=" font-normal">
          {isSystemRunning ? "Running" : "Stopped"}
        </h2>
      </div>
    );
  };

  // Delete Function Added
  const handleDelete = (id, electionName) => {
    axios
      .delete(`https://evs-delta.vercel.app/candidate/under/${electionName}`)
      .then((res) => {
        console.log(res.data);
      });

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to fire this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deleted it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(
          `https://evs-delta.vercel.app/create-vote/${id}`
        );
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "fire!",
            text: `this Candidate has been deleted.`,
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  //Send Notification when Admin delete a election

  const handleNotification = (type, electionName, electionEmail) => {
    const notification = {
      senderEmail: user?.email,
      receiverEmail: electionEmail,
      type,
      electionName,
    };

    axios
      .post("https://evs-delta.vercel.app/notification", notification)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <Protected>
      <div className="mt-5">
        <div className="grid gap-2 drop-shadow-lg">
          {elections?.map((election, index) => (
            <div
              key={election._id}
              className={`${
                index % 2 === 0 ? "bg-white/90 rounded-md" : "bg-white/80"
              } text-center font-semibold rounded-md`}
            >
              <div className="grid grid-cols-12 py-5 items-center justify-center space-y-1 font-medium">
                <p className="col-span-2">{index + 1}</p>
                <p className="col-span-2">{election?.OrganizatonName}</p>
                <p className="col-span-2">{election?.name}</p>
                <div className="col-span-2">
                  <Timer
                    startDate1={`${election?.startDate}T${election?.startTime}`}
                    endDate1={`${election?.endDate}T${election?.endTime}`}
                  />
                </div>
                <Link
                  className="col-span-2"
                  href={`/dashboard/allElections/${election._id}`}
                >
                  <button className="border border-gray-600 px-[10px] font-normal py-[6px] rounded-md">
                    See Details
                  </button>
                </Link>
                <div className="col-span-2">
                  <button
                    onClick={() => {
                      handleNotification(1, election?.name, election?.email);
                      handleDelete(election._id, election?.name);
                    }}
                    className="bg-red-500 text-white px-4 py-[10px] rounded-md mr-2"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Protected>
  );
};

export default ShowElections;
