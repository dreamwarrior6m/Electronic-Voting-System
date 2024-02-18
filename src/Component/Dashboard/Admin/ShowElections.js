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
        <h2>
          <span className="font-bold">Status: </span>
          {isSystemRunning ? "Running" : "Stopped"}
        </h2>
      </div>
    );
  };

  // Delete Function Added
  const handleDelete = (id) => {
    axios
      .delete(`https://evs-delta.vercel.app/create-vote/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Successfully",
            text: "Deleted",
            icon: "success",
            confirmButtonText: "oky",
          });
          refetch();
        }
      });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const OrganizatonName = form.OrganizatonName.value;
    const Type = form.Type.value;
    const name = form.voteName.value;
    const photo = form.photo.value;
    const startDate = form.startDate.value;
    const startTime = form.startTime.value;
    const endDate = form.endDate.value;
    const endTime = form.endTime.value;
    const electionId = form.electionId.value;

    const obj = {
      OrganizatonName,
      Type,
      endDate,
      endTime,
      name,
      photo,
      startDate,
      startTime,
    };
    console.log(electionId);
    axios
      .put(`https://evs-delta.vercel.app/create-vote/update/${electionId}`, obj)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Successfully",
            text: "Updated",
            icon: "success",
            confirmButtonText: "oky",
          });
          refetch();
          form.reset();
        }
      });
  };

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
      <div>
        <div className="grid lg:grid-cols-3 gap-5 drop-shadow-lg">
          {elections?.map((election, index) => (
            <div
              key={election._id}
              className={`${
                index % 2 === 0 ? "bg-gray-100 rounded-xl" : "bg-white"
              } text-center font-semibold rounded-xl`}
            >
              <div className="grid py-8 items-center space-y-1">
                <p className="text-black text-3xl">{index + 1}</p>
                <p className="text-2xl font-bold">
                  {election?.OrganizatonName}
                </p>
                <p className="text-lg">
                  <span className="font-bold">Name: </span>
                  {election?.name}
                </p>
                <Timer
                  startDate1={`${election?.startDate}T${election?.startTime}`}
                  endDate1={`${election?.endDate}T${election?.endTime}`}
                />
                <div className="pb-1">
                  <button
                    onClick={() => {
                      handleNotification(1, election?.name, election?.email);
                      handleDelete(election._id);
                    }}
                    className="bg-red-500 text-white px-4 py-[10px] rounded-md mr-2"
                  >
                    <MdDelete />
                  </button>
              
                </div>
                <Link href={`/dashboard/allElections/${election._id}`}>
                  <button className="bg-gray-600 text-sm font-medium text-white px-4 py-2 rounded-md">
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
