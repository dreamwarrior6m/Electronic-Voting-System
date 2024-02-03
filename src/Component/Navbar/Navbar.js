"use client";
import useAuth from "@/app/hook/useAuth";
import Image from "next/image";
import Link from "next/link";
import userProfile from "../../../public/images/EVS.jpg";
import Links from "./Link/Links";
import styles from "./Navbar.module.css";


const Navbar = () => {
  const { user, logOut } = useAuth();
  console.log(user);
  const handleLogOut = () => {
    logOut()
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  return (
    <div className="lg:sticky lg:top-0 lg:z-10 lg:w-full lg:bg-[#00263A] text-white lg:drop-shadow-sm border-b-[1px] border-white/10">
      <div className="max-w-7xl flex items-center justify-between px-4 lg:px-0  py-3 mx-auto">
        <div>
          <p className="font-bold text-[30px] lg:ml-1">DVS</p>
        </div>
        <div className="flex items-center">
          <Links></Links>
          {user && (
            <div className="dropdown dropdown-end ml-2">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  {user && (
                    <Image
                      width={20}
                      height={20}
                      alt="User Profile"
                      src={user?.photoURL ? user?.photoURL : userProfile}
                    />
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[100] p-4 shadow bg-white text-black rounded-box w-48 mt-4"
              >
                <div className="">
                  {user && <p className="mb-3 ml-4">{user?.displayName}</p>}
                  {user && (
                    <li>
                      <Link href="/Profile">Profile</Link>
                    </li>
                  )}
                  <li>
                    <button onClick={handleLogOut}>Log Out</button>
                  </li>
                </div>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
