/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { useAuthState } from "react-firebase-hooks/auth";
const page = () => {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [user] = useAuthState(auth);
  console.log(user?.email);
  // if(!user){
  //   router.push('/login')
  // }

  const handleCreate = async (event) => {
    event.preventDefault();
    const form = event.target;
    const OrganizatonName = form.OrganizatonName.value;
    const Type = form.Type.value;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = user?.email;
    const createVoteInfo = { OrganizatonName, Type, email, name, photo };
    console.log(OrganizatonName, Type, email, name, photo);

    setloading(true);

    try {
      const res = await fetch("http://localhost:5000/create-vote", {
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
              <div className="grid lg:grid-cols-2 gap-2">
                <div>
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

                  {/* <div className="form-control">
                    <label className="label">
                      <span className="label-text dark:text-white">
                        Your E-mail
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      className="input input-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                      required
                      name="email"
                    />
                  </div> */}

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
                <div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text dark:text-white">
                        Vote Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Vote Name"
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
