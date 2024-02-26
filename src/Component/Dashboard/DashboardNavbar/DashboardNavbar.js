"use client";
import { MdEdit, MdOutlineChat, MdSearch } from "react-icons/md";
import useAuth from "@/app/hook/useAuth";
import Image from "next/image";
import Notification from "@/Component/Notification/Notification";
import { useEffect, useState } from "react";
import "./DashboardNavbar.css";
import { FaRegCopy } from "react-icons/fa";
import axios from "axios";

const DashboardNavbar = () => {
  const { user } = useAuth();
  const [openProfile, setOpenProfile] = useState(false);
  const [users, setusers] = useState([]);


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

  return (
    <>
      <div className="text-white lg:flex lg:justify-between lg:items-center relative">
        <div className="hidden lg:block p-2 bg-blue-200/15  rounded-md">
          <div className="flex items-center justify-around">
            <input
              type="text"
              className="bg-transparent px-1.5 mx-2"
              placeholder="Search..."
            />
            <button className="hover:bg-blue-200/30">
              {" "}
              <MdSearch className="text-lg text-white/65" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-blue-200/15 p-1.5 px-6 rounded-md">
          <MdOutlineChat size={24} />
          <Notification />
          <Image
            onClick={() => {
              setOpenProfile(!openProfile);
            }}
            className=" rounded-full h-[30px] w-[30px] object-cover"
            height={30}
            width={30}
            src={user?.photoURL}
            alt="Profile Photo"
          />
          <div
            className={`dropdown-menus shadow-xl z-20 border border-gray-800 ${
              openProfile ? "active" : "inactive"
            } h-auto`}
          >
            <ul>
              <div className="flex justify-end text-xl cursor-pointer">
                <MdEdit
                  className=""
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                />
              </div>
              <div className="grid gap-4 items-center h-auto">
                <h1 className=" font-bold text-lg mb-2">
                  Welcome Back !! <br />{" "}
                  <span className="text-2xl">{users.isRole} Dashboard</span>
                </h1>
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
                  <p>{users?.idNumber}</p> <FaRegCopy />
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
                      <p className="">{users?.date}</p>
                    </div>
                  </div>
                </div>
              </div>
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
                        <span className=" dark:text-white">
                          Change Date of birth
                        </span>
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
                    <button className="btn bg-primary-content w-full">
                      Update
                    </button>
                  </form>
                </div>
              </dialog>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;
