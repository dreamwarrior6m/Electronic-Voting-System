"use client"
import { useState, useEffect } from "react";
import { IoIosHome, IoIosCube, IoIosCart, IoIosLogIn, IoMdInformationCircle, IoMdList, IoIosConstruct } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import Notification from "../Notification/Notification";
import Image from "next/image";
import useAuth from "@/app/hook/useAuth";
import NavLink from "./NavLink/Navlink";


const Nav = () => {
  const { user, logOut } = useAuth();
  const Links = [
    {
      id: 1,
      path: "/",
      title: "Home",
      icon: <IoIosHome />,
    },
    {
      id: 2,
      path: "/show-all-vote",
      title: "All Vote",
      icon: <IoMdList />,
    },
    {
      id: 3,
      path: "/about",
      title: "About",
      icon: <IoMdInformationCircle />,
    },
    {
      id: 4,
      path: "/service",
      title: "Service",
      icon: <IoIosConstruct />,
    },
    {
      id: 5,
      path: "/createvote",
      title: "Create Vote",
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
      className={`fixed top-0 left-0 w-full z-50 bg-[#441760] shadow-lg`}
      animate={controls}
      initial={{ opacity: 1, y: 0 }}
    >
      <div className="container mx-auto px-4 md:px-6 py-3 flex flex-col md:flex-row justify-between items-center">
        <motion.div
          className="flex items-center gap-16"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="font-bold  text-2xl flex items-center font-[Poppins] text-white"
          >
            <span className="text-3xl text-indigo-600 mr-2">
              <ion-icon name="logo-ionic"></ion-icon>
            </span>
            DVS
          </Link>
          <div className=" md:hidden text-white ">
          {user &&  <Notification  /> 
          }
          </div>
          <div className=" md:hidden">
          {user && (
            <div className="dropdown dropdown-end md:ml-2 ml-5">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-8 rounded-full">
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
                <FiX onClick={closeMenu} className="text-2xl text-white" />
              ) : (
                <FiMenu className="text-2xl text-white" />
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
              className="mt-2 text-white md:mt-0 md:ml-4 ml-8 hidden md:block"
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
                <div className="w-8 rounded-full">
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
