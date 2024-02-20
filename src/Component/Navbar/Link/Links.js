"use client";
import { useState } from "react";
import NavLink from "../NavLink/Navlink";
import styles from "./Link.module.css";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import useAuth from "@/app/hook/useAuth";

const Links = () => {
  const { user } = useAuth();
  const Links = [
    {
      id: 1,
      path: "/",
      title: "Home",
    },
    {
      id: 2,
      path: "/show-all-vote",
      title: "All Vote",
    },
    {
      id: 3,
      path: "/about",
      title: "About",
    },
    {
      id: 4,
      path: "/service",
      title: "Service",
    },

    {
      id: 5,
      path: "/createvote",
      title: "Create Vote",
    },

    {
      id: 6,
      path: "/login",
      title: "Log In",
    },
  ];
  const [open, setopen] = useState(false);

  return (
    <div>
      <div className={styles.link}>
        {Links.map((item) => (
          <NavLink item={item} key={item.id}></NavLink>
        ))}
      </div>
      <button className={styles.menu} onClick={() => setopen((prev) => !prev)}>
        {open ? <RxCross2 /> : <FaBars />}
      </button>
      {open && (
        <div className={styles.mobileDevice}>
          {Links.map((item) => (
            <NavLink item={item} key={item.id}></NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
