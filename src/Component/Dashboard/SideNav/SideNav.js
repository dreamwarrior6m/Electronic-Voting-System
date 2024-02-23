import { auth } from "@/app/firebase/config";
import useAuth from "@/app/hook/useAuth";
import axios from "axios";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { CgMoreVertical } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { GiVote } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import {
  MdChevronLeft,
  MdChevronRight,
  MdDashboard,
  MdOutlineLogout,
  MdOutlineSettings,
  MdPeople,
} from "react-icons/md";

const SideBarContext = createContext();

export const SideNav = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
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
  // console.log(users);


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
              <Link
                href="/dashboard/ownElections"
                className={`flex mb-2 justify-start items-center gap-4 px-5 text-white p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200  ${
                  location === "/dashboard/ownElections"
                    ? "text-white bg-primary border-gray-200/10 hover:border-gray-200"
                    : ""
                }`}
              >
                <GiVote className="text-2xl " />
                <h3 className="font-semibold">My Elections</h3>
              </Link>

              <Link
                href="/dashboard/myPoll"
                className={`flex mb-2 justify-start items-center gap-4 px-5 text-white p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200  ${
                  location === "/dashboard/myPoll"
                    ? "text-white bg-primary border-gray-200/10 hover:border-gray-200"
                    : ""
                }`}
              >
                <GiVote className="text-2xl " />
                <h3 className="font-semibold">My Poll</h3>
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
                    : ""
                }`}
              >
                <FaUsers className="text-2xl group-hover:text-white" />
                <h3 className="text-white font-semibold">
                  All Candidate
                </h3>
              </Link>
              <Link
                href="/dashboard/allPoll"
                className={`flex mb-2 justify-start items-center gap-4 px-5 text-white p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200  ${
                  location === "/dashboard/allPoll"
                    ? "text-white bg-primary border-gray-200/10 hover:border-gray-200"
                    : ""
                }`}
              >
                <GiVote className="text-2xl " />
                <h3 className="font-semibold">All Poll</h3>
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
          <Link
            href="/"
            className="flex mb-2 justify-start items-center gap-4 px-5 text-white p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200"
          >
            <IoMdHome className="text-2xl" />
            <h3 className=" font-semibold">Home</h3>
          </Link>
        </div>
        <SideBarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SideBarContext.Provider>
        {/* <div className="border-t border-gray-800 flex">
          <Image
            alt=""
            src={"https://img.logoipsum.com/243.svg"}
            width={100}
            height={100}
          />
          <div
            className={`flex mb-2 justify-start items-center gap-4 px-5 text-white p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200 ${
              location === "dashboard/setting" ? "text-white bg-primary" : ""
            }`}
          >
            <div className="loading-4">
              <h4 className="font-semibold">JK</h4>
              <span className="text-xs text-gray-600">jk@gmail.com</span>
            </div>
            <CgMoreVertical size={20} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export function SideBarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SideBarContext);
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
      ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-[#4B53B8] hover:text-white text-gray-600"
      }

    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        ></div>
      )}
      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
