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
import axios from "axios";

const RootLayout = ({ children }) => {
  const location = usePathname();
  const { user, logOut } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`https://evs-delta.vercel.app/users/${user?.email}`)
      .then((res) => {
        setUsers(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user?.email]);

  console.log(users);

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
                  
                >
                  <SideBarItem
                    icon={<GiVote size={25} />}
                    text="My Poll"
                    alert
                  />
                </Link>
                <Link
                  href="/dashboard/allPoll"
                
                >
                   <SideBarItem
                    icon={<GiVote size={25} />}
                    text="My Poll"
                    alert
                  />
                </Link>
                <Link
                  href="/dashboard/allVoter"
                 
                >
                   <SideBarItem
                    icon={<GiVote size={25} />}
                    text="My Poll"
                    alert
                  />
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
