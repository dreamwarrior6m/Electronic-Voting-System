import { auth } from "@/app/firebase/config";
import useAuth from "@/app/hook/useAuth";
import axios from "axios";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { GiVote } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import {
  MdDashboard,
  MdOutlineLogout,
  MdOutlineSettings,
  MdPeople,
} from "react-icons/md";
import { SiSecurityscorecard } from "react-icons/si";

const SideNav = ({ children }) => {
  const location = usePathname();
  const { user, logOut } = useAuth();
  const [users, setusers] = useState([]);
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
  console.log(users);

  return (
    <div className="">
      <div className="flex flex-col justify-start items-center md:fixed overflow-x-hidden">
        <h1 className="text-4xl text-white font-bold mb-1">DVS</h1>
        <h2 className="text-xl text-center cursor-pointer font-medium text-white w-full">
          Digital Voting System
        </h2>

        <h4 className="loading loading-infinity loading-lg my-4 text-primary"></h4>

        <div className="mb-3 border-b-4 border-gray-200/10 pb-4 w-full">
          <Link
            href="/dashboard/home"
            className={`flex mb-2 justify-start items-center gap-4 px-5 text-white p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200  ${
              location === "/dashboard/home"
                ? "text-white bg-primary border-gray-200/10 hover:border-gray-200"
                : ""
            }`}
          >
            <MdDashboard className="text-2xl " />
            <h3 className="font-semibold">Dashboard</h3>
          </Link>

          {users?.isRole == "Modarator" && (
            <>
              {/* <Link
                href="/dashboard/createCandidate"
                className={`flex mb-2 justify-start items-center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200 ${
                  location === "/dashboard/createCandidate"
                    ? "bg-gray-900 text-white"
                    : "text-gray-80"
                }`}
              >
                <IoPersonAdd className="text-2xl group-hover:text-white" />
                <h3 className="text-base group-hover:text-white font-semibold">
                  Create Candidate
                </h3>
              </Link> */}

              <Link
                href="/dashboard/ownElections"
                className={`flex mb-2 justify-start items-center gap-4 px-5 text-white p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200  ${
                  location === "/dashboard/home"
                    ? "text-white bg-primary border-gray-200/10 hover:border-gray-200"
                    : ""
                }`}
              >
                <GiVote className="text-2xl " />
                <h3 className="font-semibold">My Elections</h3>
              </Link>
            </>
          )}

          {users?.isRole == "Admin" && (
            <>
              <Link
                href="/dashboard/allElections"
                className={`flex mb-2 justify-start items-center gap-4 px-5 text-white p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200 ${
                  location === "/dashboard/allElections"
                    ? "text-white bg-primary"
                    : ""
                }`}
              >
                <GiVote className="text-2xl group-hover:text-white" />
                <h3 className=" text-white font-semibold">All Elections</h3>
              </Link>
              <Link
                href="/dashboard/Candidate"
                className={`flex mb-2 justify-start items-center gap-4 px-5 text-white p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200 ${
                  location === "/dashboard/Candidate"
                    ? "text-white bg-primary"
                    : "text-gray-800"
                }`}
              >
                <BsPersonCircle className="text-2xl group-hover:text-white" />
                <h3 className=" text-white font-semibold">All Candidate</h3>
              </Link>
              <Link
                href="/dashboard/allVoter"
                className={`flex mb-2 justify-start items-center gap-4 px-5 text-white p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200  ${
                  location === "/dashboard/allVoter"
                    ? "text-white bg-primary"
                    : "text-gray-800"
                }`}
              >
                <MdPeople className="text-2xl group-hover:text-white" />
                <h3 className=" text-white font-semibold">All Users</h3>
              </Link>
            </>
          )}

          {/* <Link
            href="/dashboard/LivePreview"
            className={`flex mb-2 justify-start items-center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200 ${
              location === "/dashboard/LivePreview"
                ? "text-white bg-gray-900"
                : "text-gray-800"
            }`}
          >
            <SiSecurityscorecard className="text-2xl group-hover:text-white" />
            <h3 className="text-base group-hover:text-white font-semibold">
              Live Preview
            </h3>
          </Link> */}
          <Link
            href="/"
            className="flex mb-2 justify-start items-center gap-4 px-5 text-white p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200"
          >
            <IoMdHome className="text-2xl" />
            <h3 className=" font-semibold">Home</h3>
          </Link>
        </div>

        {/* setting  */}
        <div className="mt-3 w-full">
          <div
            className={`flex mb-2 justify-start items-center gap-4 px-5 text-white p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200 ${
              location === "dashboard/setting" ? "text-white bg-primary" : ""
            }`}
          >
            <MdOutlineSettings className="text-2xl" />
            <h3 className=" font-semibold">Setting</h3>
          </div>
          {/* <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer shadow-lg m-auto">
            <MdOutlineMoreHoriz className="text-2xl text-gray-600 group-hover:text-white" />
            <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">
              More
            </h3>
          </div> */}
        </div>

        {/* logout  */}
        <Link href="/" className=" w-full" onClick={() => signOut(auth)}>
          <div className="flex mb-2 justify-start items-center gap-4 px-5 text-white p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200">
            <MdOutlineLogout className="text-2xl text-white " />
            <h3 className=" font-semibold">Logout</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
