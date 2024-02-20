"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import Swal from "sweetalert2";
import ModaProtected from "@/Component/Protected/ModaProtected";

const OwnElection = () => {
  const [user] = useAuthState(auth);
  console.log(user?.email);
  const { data: elections = [], refetch } = useQuery({
    queryKey: ["elections2"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/create-vote");
      return res.data;
    },
  });
  console.log(elections);
  const filterElection = elections?.filter(
    (election) => election?.email == user?.email
  );
  const elections2 = filterElection;
  console.log(elections2);

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
        <h2 className="front-normal">
          {isSystemRunning ? "Running" : "Stopped"}
        </h2>
      </div>
    );
  };

  const handleDelete = (id, electionName) => {

    //under all candidate
    axios
      .delete(`http://localhost:5000/candidate/under/${electionName}`)
      .then((res) => {
        console.log(res.data);
      });
    
    //under all users
    axios
      .delete(`http://localhost:5000/candidate/under/users/${electionName}`)
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
          `http://localhost:5000/create-vote/${id}`
        );
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "deleted",
            text: `this Candidate has been deleted.`,
            icon: "success",
          });
          refetch();
        }
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
      .put(`http://localhost:5000/create-vote/update/${electionId}`, obj)
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
      .post("http://localhost:5000/notification", notification)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <ModaProtected>
      <div className="mt-5">
        <div className="grid gap-2">
          {elections2?.map((election, index) => (
            <div
              key={election._id}
              className={`${
                index % 2 === 0 ? "bg-white/90 rounded-md" : "bg-white/80"
              } text-center font-semibold rounded-md`}
            >
              <div className="grid grid-cols-12 py-3 items-center justify-center font-medium">
                <p className="col-span-1">{index + 1}</p>
                <p className="col-span-3">{election?.OrganizatonName}</p>
                <p className="col-span-3">{election?.name}</p>
                <div className="col-span-1">
                  <Timer
                    startDate1={`${election?.startDate}T${election?.startTime}`}
                    endDate1={`${election?.endDate}T${election?.endTime}`}
                  />
                </div>
                <div className="col-span-2">
                  <Link href={`/dashboard/allElections/${election._id}`}>
                    <button className="border border-gray-600 px-[10px] font-normal py-[6px] rounded-md">
                      See Details
                    </button>
                  </Link>
                </div>
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
                  <button
                    onClick={() =>
                      document
                        .getElementById(`my_modal_3_${election._id}`)
                        .showModal()
                    }
                    className="bg-green-500 text-white px-4 py-[10px] rounded-md"
                  >
                    <MdEdit />
                  </button>
                </div>
              </div>

              <>
                <dialog id={`my_modal_3_${election._id}`} className="modal">
                  <div className="modal-box bg-slate-200 ">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-2xl text-center mb-[10px]">
                      Update Your Election
                    </h3>
                    <form
                      className="grid lg:grid-cols-2 gap-2"
                      onSubmit={handleUpdate}
                      action=""
                    >
                      <div className="form-control">
                        <label className="label">
                          <span className="text-gray-800 dark:text-white">
                            Organization Name
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Change Organization Name"
                          className="input input-bordered py-2 rounded-sm border-blue-500 border-l-8 mb-2 text-gray-800 dark:text-white"
                          required
                          defaultValue={election.OrganizatonName}
                          name="OrganizatonName"
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className=" text-gray-800 dark:text-white">
                            Type
                          </span>
                        </label>
                        <select
                          className="input input-bordered py-2 rounded-sm border-blue-500 border-l-8 mb-2 text-gray-800 dark:text-white"
                          name="Type"
                        >
                          <option value={election.Type}>{election.Type}</option>
                          <option value="Administrative">Administrative</option>
                          <option value="Education">Education</option>
                          <option value="General">General</option>
                        </select>
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className=" text-gray-800 dark:text-white">
                            Vote Name (read Only)
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Change The vote Name"
                          className="input input-bordered py-2 rounded-sm border-blue-500 border-l-8 mb-2 text-gray-800 dark:text-white"
                          required
                          defaultValue={election.name}
                          name="voteName"
                          readOnly
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className=" text-gray-800 dark:text-white">
                            Organization Logo
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Change Photo"
                          className="input input-bordered py-2 rounded-sm border-blue-500 border-l-8 mb-2 text-gray-800 dark:text-white"
                          required
                          defaultValue={election.photo}
                          name="photo"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className=" text-gray-800 dark:text-white">
                            Start Date
                          </span>
                        </label>
                        <input
                          type="date"
                          placeholder="Change Start Date"
                          className="input input-bordered py-2 rounded-sm border-blue-500 border-l-8 mb-2 text-gray-800 dark:text-white"
                          required
                          defaultValue={election.startDate}
                          name="startDate"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className=" text-gray-800 dark:text-white">
                            Start Time
                          </span>
                        </label>
                        <input
                          type="time"
                          placeholder="Change Start Time"
                          className="input input-bordered py-2 rounded-sm border-blue-500 border-l-8 mb-2 text-gray-800 dark:text-white"
                          required
                          defaultValue={election.startTime}
                          name="startTime"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className=" text-gray-800 dark:text-white">
                            End Date
                          </span>
                        </label>
                        <input
                          type="date"
                          placeholder="Change End Date"
                          className="input input-bordered py-2 rounded-sm border-blue-500 border-l-8 mb-2 text-gray-800 dark:text-white"
                          required
                          defaultValue={election.endDate}
                          name="endDate"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className=" text-gray-800 dark:text-white">
                            End Time
                          </span>
                        </label>
                        <input
                          type="time"
                          placeholder="Change End Time"
                          className="input input-bordered py-2 rounded-sm border-blue-500 border-l-8 mb-2 text-gray-800 dark:text-white"
                          required
                          defaultValue={election.endTime}
                          name="endTime"
                        />
                      </div>

                      <input
                        type="hidden"
                        name="electionId"
                        value={election._id}
                      />

                      <button
                        type="submit"
                        className="input input-bordered bg-slate-700 text-white rounded-sm mb-2 py-3  w-full col-span-2 mt-[10px]"
                        onClick={() => {
                          handleNotification(
                            2,
                            election?.name,
                            election?.email
                          );
                          document
                            .getElementById(`my_modal_3_${election._id}`)
                            .close();
                        }}
                      >
                        Update
                      </button>
                    </form>
                  </div>
                </dialog>
              </>
            </div>
          ))}
        </div>
      </div>
    </ModaProtected>
  );
};

export default OwnElection;
