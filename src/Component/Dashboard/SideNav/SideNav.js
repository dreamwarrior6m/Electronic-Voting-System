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


  return (

    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-gray-900 border-r shadow-lg border-gray-800">
        <div className="p-5 pb-2 flex justify-between items-center">
          <div>
            <Image
              alt=""
              src={"https://img.logoipsum.com/243.svg"}
              width={100}
              height={100}
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
            />
          </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 lg:block hidden rounded-lg bg-blue-200/15 hover:text-white hover:bg-[#4B53B8]"

          >
            {expanded ? (
              <MdChevronLeft size={20} />
            ) : (
              <MdChevronRight size={20} className="text-white" />
            )}
          </button>
          
        </div>
        <SideBarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SideBarContext.Provider>

      </nav>
    </aside>

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
