"use client";
import DashboardNavbar from "@/Component/Dashboard/DashboardNavbar/DashboardNavbar";
import NavBarIcon from "@/Component/Dashboard/NavBarIcon/NavBarIcon";
import { SideBarItem, SideNav } from "@/Component/Dashboard/SideNav/SideNav";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiVote } from "react-icons/gi";
import { MdDashboard, MdOutlineLogin, MdPeople } from "react-icons/md";
import useAuth from "../hook/useAuth";
import { FaUser, FaUsers } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { usePathname } from "next/navigation";

const RootLayout = ({ children }) => {
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

  return (
    <div className="px-4 py-2 lg:flex lg:px-0 lg:py-0 bg-gray-900 min-h-screen">
      {/* SideNav  */}
      <div className="">
        <div>
          <SideNav>
            <Link
              href="/dashboard/home"
              className={location === "/dashboard/myPoll"}
            >
              <SideBarItem
                icon={<MdDashboard size={25} />}
                text="Dashboard"
                alert
              />
            </Link>

            {users?.isRole == "user" && (
              <>
                <Link href="/dashboard/myPoll">
                  <SideBarItem
                    icon={<GiVote size={25} />}
                    text="My Poll"
                    alert
                  />
                </Link>
              </>
            )}

            {users?.isRole == "Moderator" && (
              <>
                <Link href="/dashboard/ownElections">
                  <SideBarItem
                    icon={<GiVote size={25} />}
                    text="My Elections"
                    alert
                  />
                </Link>
                <Link href="/dashboard/myPoll">
                  <SideBarItem
                    icon={<GiVote size={25} />}
                    text="My Poll"
                    alert
                  />
                </Link>
              </>
            )}

            {users?.isRole == "Admin" && (
              <>
                <Link href="/dashboard/allElections">
                  <SideBarItem
                    icon={<GiVote size={25} />}
                    text="All Elections"
                    alert
                  />
                </Link>
                <Link
                  href="/dashboard/Candidate"
                  className={`flex mb-2 justify-start items-center gap-4 px-5 text-white p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200 ${
                    location === "/dashboard/Candidate"
                      ? "text-white bg-indigo-500 "
                      : ""
                  }`}
                >
                  <FaUsers className="text-2xl group-hover:text-white" />
                  <h3 className="text-white font-semibold">All Candidate</h3>
                </Link>
                <Link
                  href="/dashboard/allPoll"
                  className={`flex mb-2 justify-start items-center gap-4 px-5 text-white p-2 rounded-md group cursor-pointer shadow-lg m-auto border-2 border-gray-200/10 hover:border-gray-200  ${
                    location === "/dashboard/allPoll"
                      ? "text-white bg-indigo-500  border-gray-200/10 hover:border-gray-200"
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
                      ? "text-white bg-indigo-500 "
                      : "text-gray-800"
                  }`}
                >
                  <MdPeople className="text-2xl group-hover:text-white" />
                  <h3 className=" text-white font-semibold">All Users</h3>
                </Link>
              </>
            )}
            <Link href="/">
              <SideBarItem icon={<IoMdHome size={25} />} text="Home" alert />
            </Link>
            <Link href="/" onClick={() => signOut(auth)}>
              <SideBarItem
                icon={<MdOutlineLogin size={25} />}
                text="Logout"
                alert
              />
            </Link>
          </SideNav>
        </div>
        <div className="lg:hidden text-white">
          <NavBarIcon />
        </div>
      </div>
      <div className="flex-1 pt-1 pl-8">
        <div className="">
          <div className="p-3 rounded">
            <DashboardNavbar />
          </div>
        </div>
        {/* content  */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default RootLayout;

