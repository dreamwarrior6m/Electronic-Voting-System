import NavLink from "@/Component/Navbar/NavLink/Navlink";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import styles from "../../Navbar/NavLink/Navlink.module.css";
import useAuth from "@/app/hook/useAuth";
import axios from "axios";

const NavBarIcon = () => {
  const [userRoles, setUserRoles] = useState({});
  const { user } = useAuth();
  useEffect(() => {
    axios
      .get(`https://evs-delta.vercel.app/users/${user?.email}`)
      .then((res) => {
        console.log(res.data);
        setUserRoles(res.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [user]);
  const Links = [
    {
      id: 1,
      path: "/dashboard/home",
      title: "Dashboard",
    },
    ...(userRoles?.isRole === "user" ? [
      {
        id: 7,
        path: "/dashboard/myPoll",
        title: "My Polls",
      },
    ] : []),
    ...(userRoles?.isRole === "Modarator" ? [
      {
        id: 2,
        path: "/dashboard/ownElections",
        title: "My Elections",
      },
      {
        id: 7,
        path: "/dashboard/myPoll",
        title: "My Polls",
      },
    ] : []),
    ...(userRoles?.isRole === "Admin" ? [
      {
        id: 3,
        path: "/dashboard/allElections",
        title: "All Elections",
      },
      {
        id: 7,
        path: "/dashboard/candidate",
        title: "All Candidates",
      },
      {
        id: 5,
        path: "/dashboard/allpoll",
        title: "All Polls",
      },
      {
        id: 4,
        path: "/dashboard/allVoter",
        title: "Users",
      },
    ] : []),
    {
      id: 6,
      path: "/",
      title: "Home",
    },
];

  const [open, setopen] = useState(false);

  return (
    <div>
      <button className={styles.menu} onClick={() => setopen((prev) => !prev)}>
        {open ? <RxCross2 /> : <FaBars />}
      </button>
      {open && (
        <div className={styles.mobileDevice}>
          {Links.map((link) => (
            <NavLink key={link.id} href={link.path} title={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NavBarIcon;
