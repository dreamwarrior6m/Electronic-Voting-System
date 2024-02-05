/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
const page = () => {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [allCreateVote, setAllCreateVote] = useState();
  const [user] = useAuthState(auth);
  console.log('user',user)
  // console.log(user?.email);
  // if(!user){
  //   router.push('/login')
  // }

  useEffect(() => {
    axios
      .get("https://evs-delta.vercel.app/create-vote")
      .then((res) => {
        setAllCreateVote(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
    }, []);
    console.log(allCreateVote);
    

  const handleCreate = async (event) => {
    event.preventDefault();
    const form = event.target;
    const OrganizatonName = form.OrganizatonName.value;
    const Type = form.Type.value;
    const name = form.name.value;
    const photo = form.photo.value;
    const startDate = form.startDate.value;
    const startTime = form.startTime.value;
    const endDate = form.endDate.value;
    const endTime = form.endTime.value;

    const email = user?.email;
    const createVoteInfo = {
      OrganizatonName,
      Type,
      email,
      name,
      photo,
      startDate,
      startTime,
      endDate,
      endTime,
    };
    console.log(
      OrganizatonName,
      Type,
      email,
      name,
      photo,
      startDate,
      startTime,
      endDate,
      endTime
    );

    setloading(true);

    try {
      const res = await fetch("https://evs-delta.vercel.app/create-vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createVoteInfo),
      });
      if (res?.status === 200) {
        console.log(res);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Create Vote added",
          showConfirmButton: false,
          timer: 2000,
        });
        router.push("/dashboard/home");
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "There is a problem",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch {}
  };

  return (
    <div className="my-10 text-black">
      <div>
        <div className="w-full lg:max-w-[900px] mx-auto lg:p-6">
          <div className="py-6 lg:p-7 bg-[#f1faee] border-gray-200 lg:rounded-xl shadow-2xl dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-4xl font-bold text-center">DVS</h3>
            <h3 className="text-xl font-bold text-center">
              Digital Voting System
            </h3>

            <form onSubmit={handleCreate} className="card-body">
              <div className="">
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text dark:text-white">
                        Organization
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Organization Name"
                      className="input input-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                      required
                      name="OrganizatonName"
                    />
                  </div>
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text dark:text-white">
                        Select Organization Type
                      </span>
                    </label>
                    <select
                      className="input input-bordered py-2 rounded-sm border-blue-500 border-l-8 mb-2"
                      name="Type"
                      id=""
                    >
                      <option value="Administrative">Administrative</option>
                      <option value="Education">Education</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text dark:text-white">
                        Vote Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Vote Name must unique"
                      className="input input-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                      required
                      name="name"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text dark:text-white">
                        Organization Logo
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Photo Link"
                      className="input input-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                      required
                      name="photo"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text dark:text-white">
                        Start Date
                      </span>
                    </label>
                    <input
                      type="date"
                      placeholder="Start Date"
                      className="input input-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                      required
                      name="startDate"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text dark:text-white">
                        Start Time
                      </span>
                    </label>
                    <input
                      type="time"
                      placeholder="Start Time"
                      className="input input-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                      required
                      name="startTime"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text dark:text-white">
                        End Date
                      </span>
                    </label>
                    <input
                      type="date"
                      placeholder="End Date"
                      className="input input-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                      required
                      name="endDate"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text dark:text-white">
                        End Time
                      </span>
                    </label>
                    <input
                      type="time"
                      placeholder="End Time"
                      className="input input-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                      required
                      name="endTime"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text dark:text-white">
                        Your E-mail
                      </span>
                    </label>
                    <input
                      defaultValue={user?.email}
                      disabled
                      type="email"
                      placeholder="Enter Your Email"
                      className="input input-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                      name="email"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text dark:text-white">
                        Your Name
                      </span>
                    </label>
                    <input
                      type="text"
                      disabled
                      defaultValue={user?.displayName}
                      placeholder="Your name"
                      className="input input-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                    />
                  </div>
                </div>
              </div>

              <div className="form-control mt-6 w-full ">
                <button className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-sm border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                  {loading ? (
                    <h1 className="loading loading-spinner loading-sm"></h1>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
