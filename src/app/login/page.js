/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

const page = () => {
  //firebase
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [loading, setloading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  console.log({ user });

  const handleLogin = async (event) => {
    event.preventDefault();
    const from = event.target;
    const email = from.email.value;
    const password = from.password.value;

    setloading(true);

    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      if (res) {
        from.reset()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        router.push("/");
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Enail & Password Wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="dark:bg-slate-900 bg-gray-100 flex lg:h-screen items-center" style={{backgroundImage: 'url(https://i.postimg.cc/sgjS2KpT/logo-vote.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <div className="w-full lg:max-w-[700px] mx-auto lg:p-6 ">
        <div className="py-6 lg:p-9 bg-white border-gray-200 rounded-xl shadow-2xl dark:bg-gray-800 dark:border-gray-700">
          <div className="pt-4 px-4 lg:px-4">
            <div className="text-center">
              <h1 className="block text-3xl font-bold text-gray-800 dark:text-white">
                Login Now
              </h1>
            </div>
          </div>
          <div className="px-6 lg:px-4 ">
            <div className="text-center ">
              <button className="mt-2 text-xl text-gray-600 dark:text-gray-400">
                Do not have account?
                <Link className="text-blue-400 font-bold underline" href="/registration">
                  Register Now
                </Link>
              </button>
            </div>
          </div>

          <div className="py-6 px-4 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
            Or
          </div>

          <form
            onSubmit={handleLogin}
            className="px-6 md:px-8 lg:px-6 pb-4 lg:pb-7"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text dark:text-white">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your E-Mail"
                className="input input-bordered"
                required
              />
            </div>
            <div className="relative">
              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-white">Password</span>
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Enter Your Password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="absolute -mt-[42px] right-0 flex items-center pr-3">
                <p
                  onClick={() => setShowPass(!showPass)}
                  className="p-2 focus:outline-none"
                >
                  {showPass ? (
                    <PiEyeLight className="h-5 w-5" />
                  ) : (
                    <PiEyeSlash className="h-5 w-5 " />
                  )}
                </p>
              </div>
            </div>
            <div className="form-control mx-auto mt-5">
              <button
                type="submit"
                
                className=" py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              >
                {loading ? (
                    <p className="loading loading-spinner loading-sm" />
                  ) : (
                    "Log In"
                  )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
