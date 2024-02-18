"use client";
import Rechart from "@/Component/Dashboard/Rechart/Rechart";
import useAuth from "@/app/hook/useAuth";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegCopy, FaUsers } from "react-icons/fa";
import { GiVote } from "react-icons/gi";
import { RiUserStarLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";

const HomePage = () => {
  const { user } = useAuth();
  const [users, setusers] = useState([]);

  const [allUser, setAlluser] = useState([]);
  const userData = `https://evs-delta.vercel.app/users`;
  useEffect(() => {
    fetch(userData)
      .then((res) => res.json())
      .then((data) => setAlluser(data));
  }, [userData]);
  console.log(allUser);

  const User = allUser?.filter((users) => users?.email == user?.email);
  console.log(User?.[0]?.idNumber);

  // update profile
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const date = form.date.value;
    const name = form.name.value;
    const alldata = { name, date };
    console.log(alldata);

    fetch(`https://evs-delta.vercel.app/users/${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(alldata),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal("Thank You", "Update Successfully", "success");
        }
      });
  };

  // user in the mongodb not firebase

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.email) {
          const res = await axios.get(
            `https://evs-delta.vercel.app/users/${user?.email}`
          );
          setusers(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user?.email]);

  return (
    <div className="text-white pt-6">
      <div className="grid grid-cols-4 gap-5 w-full justify-items-center">
        <div className="col-span-3 w-full">
          <div className="stats shadow w-full bg-blue-200/5 rounded-none">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total Likes</div>
              <div className="stat-value text-primary">25.6K</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Page Views</div>
              <div className="stat-value text-secondary">2.6M</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Page Views</div>
              <div className="stat-value text-secondary">2.6M</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </div>
          {/* table  */}

          <div className="stats shadow w-full bg-blue-200/5 rounded-none mt-6">
            <div className="stat">
              <div className="stat-figure text-primary">
                <FaUsers className="inline-block w-8 h-8 stroke-current" />
              </div>
              <div className="stat-title">Total Users</div>
              <div className="stat-value text-primary">2.6K</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <GiVote className="inline-block w-8 h-8 stroke-current" />
              </div>
              <div className="stat-title">Total Elections</div>
              <div className="stat-value text-secondary">1.6k</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <RiUserStarLine className="inline-block w-8 h-8 stroke-current" />
              </div>
              <div className="stat-title">Total Candidate</div>
              <div className="stat-value text-secondary">1.2k</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </div>

          {/* chart  */}
          <div className="">
            <Rechart />
          </div>
        </div>

        <div className="bg-blue-200/10 px-10 py-4 w-full h-full shadow-xl image-full hidden lg:block">
          <div className="flex justify-end text-xl cursor-pointer">
            <MdEdit
              className=""
              onClick={() => document.getElementById("my_modal_3").showModal()}
            />
          </div>
          <h1 className=" font-bold text-lg mb-2">
            Welcome Back !! <br />{" "}
            <span className="text-2xl">{users.isRole} Dashboard</span>
          </h1>

          <div className="grid gap-4 items-center">
            <div className="w-24 h-24">
              <Image
                className="w-full h-full rounded-full object-cover"
                height={100}
                width={100}
                src={user?.photoURL}
                alt="Profile Photo"
              />
            </div>
            <div className="flex gap-1 items-center">
              <p>{User?.[0]?.idNumber}</p> <FaRegCopy />
            </div>
            {user && (
              <h1 className="text-2xl text-white font-semibold">
                {user?.displayName}
              </h1>
            )}

            <hr />
            <div className="">
              <div className="grid gap-6">
                <div>
                  <h2 className="text-lg font-bold">Full Name</h2>
                  {user && <p className="">{user?.displayName}</p>}
                </div>
                <div>
                  <h2 className="font-bold">Email</h2>

                  {user && <p className="font-semibold">{user?.email}</p>}
                </div>
                <div>
                  <h2 className="font-bold">Date Of Birdth</h2>
                  <p className="">{User?.[0]?.date}</p>
                </div>
                <div>
                  <h2 className="font-bold">ID Number</h2>
                  <p>{User?.[0]?.idNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box bg-slate-500 ">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg text-center">
              Update your profile
            </h3>
            <form onSubmit={handleUpdate} action="">
              <div className="form-control">
                <label className="label">
                  <span className=" dark:text-white">Change Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Change Name"
                  className="input input-bordered text-white"
                  required
                  name="name"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className=" dark:text-white">Change Date of birth</span>
                </label>
                <input
                  type="date"
                  placeholder="Photo"
                  className="input input-bordered text-white"
                  required
                  name="date"
                />
              </div>
              <br />
              <button className="btn bg-primary-content w-full">Update</button>
            </form>
          </div>
        </dialog>
      </>
    </div>
  );
};

export default HomePage;
