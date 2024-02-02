"use client";
import useAuth from "@/app/hook/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import Swal from "sweetalert2";
import registrationImg from "../../../public/images/logo (2).png";

const Registration = () => {
  const { createUser, updateUserProfile } = useAuth();
  const router = useRouter();
  const [Error, seterror] = useState();
  const [loading, setloading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    const from = e.target;
    const name = from.name.value;
    const email = from.email.value;
    const password = from.password.value;
    const photo = from.photo.value;
    const date = from.date.value;
    const idNumber = from.idNumber.value;
    const verify = false;
    const user = { name, email, photo, date, idNumber, verify };
    console.log(user);

    if (password.length < 6) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password should be 6 characters or more",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (!/[A-Z]/.test(password)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password should have at least one capital letter",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (!/[!@#$%^&*()_+{}[\]:;<>,/.?~\\]/.test(password)) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password should have at least one special character",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    setloading(true);
    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photo)
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Login successfully",
              showConfirmButton: false,
              timer: 2000,
            });
            from.reset();
            window.location.reload();
            fetch("https://evs-delta.vercel.app/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            });
          })
          .catch((error) => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `${error.code}`,
              showConfirmButton: false,
              timer: 2000,
            });
          });
        router.push("/");
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${error.code}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    // <div>
    //   <div
    //     className="dark:bg-slate-900 bg-gray-100 flex items-center"
    //     style={{
    //       backgroundImage: "url(https://i.postimg.cc/sgjS2KpT/logo-vote.jpg)",
    //       backgroundRepeat: "no-repeat",
    //       backgroundSize: "cover",
    //     }}
    //   >
    //     <div className="w-full lg:max-w-[900px] mx-auto lg:p-6">
    //       <div className="py-6 lg:p-7 bg-[#f1faee] border-gray-200 rounded-xl shadow-2xl dark:bg-gray-800 dark:border-gray-700">
    //         <div className="pt-4 px-4 ">
    //           <div className="text-center">
    //             <h1 className="block text-3xl font-bold text-gray-800 dark:text-white">
    //               Register Now
    //             </h1>
    //           </div>
    //         </div>
    //         <div className="px-4 ">
    //           <div className="text-center ">
    //             <button className="mt-2 text-xl text-gray-600 dark:text-gray-400">
    //               Already have an account?
    //               <Link
    //                 className="text-blue-400 underline font-bold"
    //                 href="/login"
    //               >
    //                 Login Now
    //               </Link>
    //             </button>
    //           </div>
    //         </div>

    //         <div className="pt-6  px-4 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
    //           Or
    //         </div>

    //         <form onSubmit={handleRegistration} className="card-body -mt-4">
    //           <div className="grid lg:grid-cols-12 gap-4">
    //             <div className="form-control col-span-6">
    //               <label className="label">
    //                 <span className=" dark:text-white">Name</span>
    //               </label>
    //               <input
    //                 type="text"
    //                 placeholder="Enter Your Name"
    //                 className="input input-bordered"
    //                 required
    //                 name="name"
    //               />
    //             </div>
    //             <div className="form-control col-span-6">
    //               <label className="label">
    //                 <span className=" dark:text-white">E-mail</span>
    //               </label>
    //               <input
    //                 type="text"
    //                 placeholder="Enter Your E-mail"
    //                 className="input input-bordered"
    //                 required
    //                 name="email"
    //               />
    //             </div>
    //             <div className="relative col-span-6">
    //               <div className="form-control">
    //                 <label className="label">
    //                   <span className="label-text dark:text-whitee">
    //                     Password
    //                   </span>
    //                 </label>
    //                 <input
    //                   type={showPass ? "text" : "password"}
    //                   name="password"
    //                   placeholder="Enter your password"
    //                   className="input input-bordered"
    //                   required
    //                 />
    //               </div>
    //               <div className="absolute -mt-[42px] right-0 flex items-center pr-3">
    //                 <p
    //                   onClick={() => setShowPass(!showPass)}
    //                   className="p-2 focus:outline-none"
    //                 >
    //                   {showPass ? (
    //                     <PiEyeLight className="h-5 w-5" />
    //                   ) : (
    //                     <PiEyeSlash className="h-5 w-5 " />
    //                   )}
    //                 </p>
    //               </div>
    //             </div>
    //             <div className="form-control col-span-6">
    //               <label className="label">
    //                 <span className=" dark:text-white">ID Card Number</span>
    //               </label>
    //               <input
    //                 type="text"
    //                 placeholder="Enter Your ID Card Number"
    //                 className="input input-bordered"
    //                 required
    //                 name="idNumber"
    //               />
    //             </div>

    //             <div className="form-control col-span-6">
    //               <label className="label">
    //                 <span className=" dark:text-white">Upload Picture</span>
    //               </label>
    //               <input
    //                 type="text"
    //                 placeholder="Enter Valid Photo URL"
    //                 className="input input-bordered"
    //                 name="photo"
    //               />
    //             </div>
    //             <div className="form-control col-span-6">
    //               <label className="label">
    //                 <span className=" dark:text-white">Birth of Date</span>
    //               </label>
    //               <input
    //                 type="date"
    //                 placeholder="Photo"
    //                 className="input input-bordered"
    //                 required
    //                 name="date"
    //               />
    //             </div>
    //           </div>
    //           {Error && <p className="">{Error.message}</p>}

    //           <div className="form-control mt-5">
    //             <button
    //               type="submit"
    //               className=" py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
    //             >
    //               {loading ? (
    //                 <h1 className="loading loading-spinner loading-sm"></h1>
    //               ) : (
    //                 "Sign Up"
    //               )}
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="dark:bg-slate-900 flex lg:h-screen items-center">
      <div className="w-full lg:max-w-[600px] mx-auto lg:p-6">
        <div className="flex text-white flex-col justify-center items-center">
          <Image width={50} height={50} alt="login Img" src={registrationImg} />
          <div className="my-8 text-center">
            <h1 className="mb-2 text-3xl font-bold">Create a free account</h1>
            <h4 className="text-base">
              <span className="opacity-75">Or</span>{" "}
              <span className="text-[#4F46E5]">log in to your account</span>
            </h4>
          </div>
        </div>
        <div className="lg:px-8 lg:pt-4 lg:pb-6 bg-[#f1faee] border- border-t-4 rounded-xl shadow-2xl dark:bg-gray-800 dark:border-blue-700">
          <form onSubmit={handleRegistration} className=" w-full">
            <div className="grid lg:grid-cols-12 gap-4">
              <div className="form-control col-span-6">
                <label className="label">
                  <span className=" dark:text-white">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="input input-bordered text-white"
                  required
                  name="name"
                />
              </div>
              <div className="form-control col-span-6">
                <label className="label">
                  <span className=" dark:text-white">E-mail</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your E-mail"
                  className="input input-bordered text-white"
                  required
                  name="email"
                />
              </div>
              <div className="relative col-span-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text dark:text-whitee">
                      Password
                    </span>
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="input input-bordered text-white"
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
              <div className="form-control col-span-6">
                <label className="label">
                  <span className=" dark:text-white">ID Card Number</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your ID Card Number"
                  className="input input-bordered text-white"
                  required
                  name="idNumber"
                />
              </div>

              <div className="form-control col-span-6">
                <label className="label">
                  <span className=" dark:text-white">Upload Picture</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Valid Photo URL"
                  className="input input-bordered text-white"
                  name="photo"
                />
              </div>
              <div className="form-control col-span-6">
                <label className="label">
                  <span className=" dark:text-white">Birth of Date</span>
                </label>
                <input
                  type="date"
                  placeholder="Photo"
                  className="input input-bordered text-white"
                  required
                  name="date"
                />
              </div>
            </div>
            {Error && <p className="">{Error.message}</p>}
            <div className="flex justify-between items-center mt-4">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    checked="checked"
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                  <span className="label-text ml-3 text-base">
                    I agree to the{" "}
                    <span className="text-[#3B82F6] cursor-pointer">
                      privacy policy
                    </span>{" "}
                    and{" "}
                    <span className="text-[#3B82F6] cursor-pointer">
                      terms of service
                    </span>
                    .
                  </span>
                </label>
              </div>
            </div>
            <div className="form-control mt-5">
              <button
                type="submit"
                className=" py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              >
                {loading ? (
                  <h1 className="loading loading-spinner loading-sm"></h1>
                ) : (
                  "Registration"
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
              <Link href="/login">
                <span className="text-[#4F46E5] cursor-pointer">Login</span>
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

export default Registration;
