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
    <div className={styles.container}>
      <div>
        {/* <p className={styles.logo}>EVS</p> */}
        <Image className="w-[100px] h-[100px] rounded-full" src="https://i.postimg.cc/br5hyfp2/EVS-1-removebg-preview.png" width={500} height={500} alt="logo image"></Image>
      </div>
      <div className="lg:flex lg:gap-2 lg:items-center">
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
                    <Link href="/dashboard">Dashboard</Link>
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
  );
};

export default Navbar;
