/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { auth } from "@/app/firebase/config";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import Swal from "sweetalert2";
import loginImg from "../../../public/images/logo (2).png";

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
        from.reset();
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
    <div className="dark:bg-slate-900 flex lg:h-screen items-center">
      <div className="w-full lg:max-w-[520px] mx-auto lg:p-6">
        <div className="flex text-white flex-col justify-center items-center">
          <Image width={50} height={50} alt="login Img" src={loginImg} />
          <div className="my-8 text-center">
            <h1 className="mb-2 text-3xl font-bold">Log in to your account</h1>
            <h4 className="text-base">
              <span className="opacity-75">Or</span>{" "}
              <span className="text-[#4F46E5]">create a free account</span>
            </h4>
          </div>
        </div>
        <div className="lg:p-8 lg:pb-10 bg-[#f1faee] border- border-t-4 rounded-xl shadow-2xl dark:bg-gray-800 dark:border-blue-700">
          <form onSubmit={handleLogin} className=" w-full">
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
                    <PiEyeLight className="h-5 w-5 text-black dark:text-white" />
                  ) : (
                    <PiEyeSlash className="h-5 w-5 text-black dark:text-white" />
                  )}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    checked="checked"
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                  <span className="label-text ml-3 text-base">Remember me</span>
                </label>
              </div>
              <div>
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt text-base text-[#4F46E5] link link-hover cursor-pointer"
                  >
                    Forgot password?
                  </a>
                </label>
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
            <div>
              <div className="py-6 flex items-center text-xs  before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 text-white/80 dark:before:border-gray-600 dark:after:border-gray-600">
                Or Continue with
              </div>
              <div className="w-full gap-8 flex justify-between">
                <button className="btn flex-1  bg-[#4B5563] text-white/90">
                  Google
                </button>
                <button className="btn flex-1 bg-[#4B5563] text-white/90">
                  Google
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex text-white flex-col justify-center items-center">
          <div className="my-7 text-center">
            <h4 className="text-base">
              <span className="opacity-90">Don't have an account yet?</span>{" "}
              <Link href='/registration'>
                <span className="text-[#4F46E5] cursor-pointer">Registration</span>
              </Link>
            </h4>
          </div>
          <div className="opacity-50">
            <ul className="flex gap-6 items-center justify-center text-white">
              <li>Home</li>
              <li>Contact</li>
              <li>Terms</li>
              <li>Imprint</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
