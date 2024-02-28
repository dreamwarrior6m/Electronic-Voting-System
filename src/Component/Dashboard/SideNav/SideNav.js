import { auth } from "@/app/firebase/config";
import useAuth from "@/app/hook/useAuth";
import axios from "axios";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { GiVote } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { TfiAnnouncement } from "react-icons/tfi";
import {
  MdDashboard,
  MdOutlineLogout,
  MdOutlineSettings,
  MdPeople,
} from "react-icons/md";
import { GoMultiSelect } from "react-icons/go";

const SideNav = ({ children }) => {
  const location = usePathname();
  const { user, logOut } = useAuth();
  const [users, setusers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.email) {
          const res = await axios.get(
            `https://evs-delta.vercel.app/users/${user?.email}`,{
              withCredentials: true,
            }
          );
          setusers(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user?.email]);
  // console.log(users);

  return (
    <div className="">
      <div className="flex flex-col justify-start items-center md:fixed overflow-x-hidden">
        <h1 className="font-bold text-3xl flex items-center font-[Poppins] text-indigo-200/100  mb-1">
          DVS
        </h1>
        <h2 className="text-xl pb-5 text-center cursor-pointer font-medium text-indigo-200/100  w-full">
          Digital Voting System
        </h2>

        <div className="mb-3 border-t-4 border-gray-200/10 w-full pt-5">
          <Link
            href="/dashboard/home"
            className={`flex mb-2 justify-start items-center gap-4 px-5 text-indigo-200/100  p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200  ${
              location === "/dashboard/home"
                ? "text-indigo-200/100  bg-indigo-500  border-gray-200/10 hover:border-gray-200"
                : ""
            }`}
          >
            <MdDashboard className="text-2xl " />
            <h3 className="font-semibold">Dashboard</h3>
          </Link>
          {users?.isRole == "user" && (
            <>
              <Link
                href="/dashboard/myPoll"
                className={`flex mb-2 justify-start items-center gap-4 px-5 text-indigo-200/100  p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200  ${
                  location === "/dashboard/myPoll"
                    ? "text-indigo-200/100  bg-indigo-500  border-gray-200/10 hover:border-gray-200"
                    : ""
                }`}
              >
                <GoMultiSelect className="text-2xl " />
                <h3 className="font-semibold">My Poll</h3>
              </Link>
            </>
          )}

          {users?.isRole == "Modarator" && (
            <>
              <Link
                href="/dashboard/ownElections"
                className={`flex mb-2 justify-start items-center gap-4 px-5 text-indigo-200/100  p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200  ${
                  location === "/dashboard/ownElections"
                    ? "text-indigo-200/100  bg-indigo-500  border-gray-200/10 hover:border-gray-200"
                    : ""
                }`}
              >
                <GiVote className="text-2xl " />
                <h3 className="font-semibold">My Elections</h3>
              </Link>

              <Link
                href="/dashboard/myPoll"
                className={`flex mb-2 justify-start items-center gap-4 px-5 text-indigo-200/100  p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200  ${
                  location === "/dashboard/myPoll"
                    ? "text-indigo-200/100  bg-indigo-500  border-gray-200/10 hover:border-gray-200"
                    : ""
                }`}
              >
                <GoMultiSelect className="text-2xl " />
                <h3 className="font-semibold">My Polls</h3>
              </Link>

              <Link
                href="/dashboard/counselling"
                className={`flex mb-2 justify-start items-center gap-4 px-5 text-indigo-200/100  p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200  ${
                  location === "/dashboard/"
                    ? "text-indigo-200/100  bg-indigo-500  border-gray-200/10 hover:border-gray-200"
                    : ""
                }`}
              >
                <TfiAnnouncement className="text-2xl " />
                <h3 className="font-semibold">Create Counselling</h3>
              </Link>

            </>
          )}

          {users?.isRole == "Admin" && (
            <>
              <Link
                href="/dashboard/allElections"
                className={`flex mb-2 justify-start items-center gap-4 px-5 text-indigo-200/100  p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200 ${
                  location === "/dashboard/allElections"
                    ? "text-indigo-200/100  bg-indigo-500 "
                    : ""
                }`}
              >
                <GiVote className="text-2xl group-hover:text-indigo-200/100 " />
                <h3 className=" text-indigo-200/100  font-semibold">All Election</h3>
              </Link>
              <Link
                href="/dashboard/Candidate"
                className={`flex mb-2 justify-start items-center gap-4 px-5 text-indigo-200/100  p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200 ${
                  location === "/dashboard/Candidate"
                    ? "text-indigo-200/100  bg-indigo-500 "
                    : ""
                }`}
              >
                <FaUsers className="text-2xl group-hover:text-indigo-200/100 " />
                <h3 className="text-indigo-200/100  font-semibold">All Candidate</h3>
              </Link>
              <Link
                href="/dashboard/allPoll"
                className={`flex mb-2 justify-start items-center gap-4 px-5 text-indigo-200/100  p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200  ${
                  location === "/dashboard/allPoll"
                    ? "text-indigo-200/100  bg-indigo-500  border-gray-200/10 hover:border-gray-200"
                    : ""
                }`}
              >
                <GoMultiSelect className="text-2xl " />
                <h3 className="font-semibold">All Poll</h3>
              </Link>
              <Link
                href="/dashboard/allVoter"
                className={`flex mb-2 justify-start items-center gap-4 px-5 text-indigo-200/100  p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200  ${
                  location === "/dashboard/allVoter"
                    ? "text-indigo-200/100  bg-indigo-500 "
                    : "text-gray-800"
                }`}
              >
                <MdPeople className="text-2xl group-hover:text-indigo-200/100 " />
                <h3 className=" text-indigo-200/100  font-semibold">All User</h3>
              </Link>
            </>
          )}
          <Link
            href="/"
            className="flex mb-2 justify-start items-center gap-4 px-5 text-indigo-200/100  p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200"
          >
            <IoMdHome className="text-2xl" />
            <h3 className=" font-semibold">Home</h3>
          </Link>
        </div>

        {/* setting  */}
        {/* <div className="mt-3 w-full">
          <div
            className={`flex mb-2 justify-start items-center gap-4 px-5 text-indigo-200/100  p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200 ${
              location === "dashboard/setting" ? "text-indigo-200/100  bg-indigo-500 " : ""
            }`}
          >
            <MdOutlineSettings className="text-2xl" />
            <h3 className=" font-semibold">Setting</h3>
          </div>
        </div> */}

        {/* logout  */}
        <Link href="/" className=" w-full" onClick={() => signOut(auth)}>
          <div className="flex mb-2 justify-start items-center gap-4 px-5 text-indigo-200/100  p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200">
            <MdOutlineLogout className="text-2xl text-indigo-200/100  " />
            <h3 className=" font-semibold">Logout</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
