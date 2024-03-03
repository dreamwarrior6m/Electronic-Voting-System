"use client"
import { useState, useEffect } from "react";
import { IoIosCube, IoIosLogIn, IoMdInformationCircle, IoIosConstruct, IoMdHome } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import Notification from "../Notification/Notification";
import Image from "next/image";
import useAuth from "@/app/hook/useAuth";
import NavLink from "./NavLink/Navlink";
import { BsCardText } from "react-icons/bs";
import axios from "axios";


const Nav = () => {
  const { user, logOut } = useAuth();
  const Links = [
    {
      id: 1,
      path: "/",
      title: "Home",
      icon: <IoMdHome />,
    },
    {
      id: 2,
      path: "/show-all-vote",
      title: "Elections",
      icon: <BsCardText />,
    },
    {
      id: 3,
      path: "/about",
      title: "About",
      icon: <IoMdInformationCircle />,
    },
    // {
    //   id: 4,
    //   path: "/service",
    //   title: "Services",
    //   icon: <IoIosConstruct />,
    // },
    {
      id: 5,
      path: "/createvote",
      title: "Create Election",
      icon: <IoIosCube />,
    },
    ...(user
      ? []
      : [
          {
            id: 6,
            path: "/login",
            title: "Log In",
            icon: <IoIosLogIn />,
          },
        ]),
  ];

  const [open, setOpen] = useState(false);
  const controls = useAnimation();
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const [users, setusers] = useState();

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
  
  useEffect(() => {
    controls.start({ opacity: 1, y: 0 }); // Start animation after mounting
  }, [controls]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      const threshold = 78;

      if (isScrollingDown && currentScrollPos > threshold) {
        controls.start({ opacity: 0, y: -50 });
      } else {
        controls.start({ opacity: 1, y: 0 });
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, controls]);

  const closeMenu = () => setOpen(false);

  const handleLogOut = () => {
    logOut()
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 border-b-2 border-gray-100/10  bg-gray-900 shadow-lg`}
      animate={controls}
      initial={{ opacity: 0, y: -50 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-col md:flex-row justify-between items-center">
        <motion.div
          className="flex items-center gap-14"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="font-bold  text-3xl flex items-center font-[Poppins] text-white/90"
          >
            <span className="text-3xl text-white/90 mr-2">
              <ion-icon name="logo-ionic"></ion-icon>
            </span>
            DVS
          </Link>
          <div className=" md:hidden text-white/90">
          {user &&  <Notification /> 
          }
          </div>
          <div className=" md:hidden">
          {user && (
            <div className="dropdown dropdown-end md:ml-2 ml-5">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className=" rounded-full border-[2px] border-white/90">
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
                className="menu dropdown-content z-[100] p-4 shadow bg-gray-700/95 text-white/90 rounded-box w-48 mt-4"
              >
                <div className="">
                  {user && <p className="mb-3 ml-4">{user?.displayName}</p>}

                  <li>
                    <Link href="/dashboard/home">dashboard</Link>
                  </li>

                  <li>
                    <button onClick={handleLogOut}>Log Out</button>
                  </li>
                </div>
              </ul>
            </div>
          )}
          </div>
          <div className="md:hidden ml-2">
            <motion.div
              onClick={() => setOpen(!open)}
              className="text-3xl cursor-pointer transition-transform duration-300 transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {open ? (
                <FiX onClick={closeMenu} className="text-2xl text-white/90" />
              ) : (
                <FiMenu className="text-2xl text-white/90" />
              )}
            </motion.div>
          </div>

        </motion.div>

        <ul
          className={`md:flex md:items-center md:space-x-6 md:pb-0 pb-3 ${
            open ? "block" : "hidden md:block"
          }`}
        >
          {Links.map((link) => (
            <motion.li
              key={link.name}
              className="md:my-0 my-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <NavLink href={link.path} icon={link.icon} title={link.title} />
            </motion.li>
          ))}
          {user && (
            <motion.li
              className="mt-2 text-white/90 md:mt-0 md:ml-4 ml-8 hidden md:block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Notification classes="mt-2 md:mt-0 md:ml-4" />
            </motion.li>
          )}
          {user && (
            <div className="dropdown dropdown-end md:ml-2 ml-5  hidden md:block">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border-[2px] border-white/90">
                  {user && (
                    <Image
                      width={40}
                      height={40}
                      alt="User Profile"
                      src={user?.photoURL ? user?.photoURL : userProfile}
                    />
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[100] p-4 shadow bg-gray-700/95 text-white/90 rounded-box w-48 mt-4"
              >
                <div className="">
                  {user && <p className="mb-3 ml-4">{user?.displayName}</p>}

                  <li>
                    <Link href="/dashboard/home">dashboard</Link>
                  </li>

                  <li>
                    <button onClick={handleLogOut}>Log Out</button>
                  </li>
                </div>
              </ul>
            </div>
          )}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Nav;
