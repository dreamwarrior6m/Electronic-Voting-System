import NavLink from "@/Component/Navbar/NavLink/Navlink";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import styles from '../../Navbar/NavLink/Navlink.module.css'

const NavBarIcon = () => {

  const Links = [
    {
      path: "/dashboard/createCandidate",
      title: "Create Candidate",
    },
    {
      path: "/dashboard/Candidate",
      title: "Candidate",
    },
    {
      path: "/dashboard/allElections",
      title: "All Elections",
    },
    {
      path: "/dashboard/allVoter",
      title: "All Voter",
    },
    {
      path: "/dashboard/LivePreview",
      title: "Live Preview",
    },
    {
      path: "/dashboard/profile",
      title: "Profile",
    },
    {
      path: "/",
      title: "Home",
    }
  ];

  const [open, setopen] = useState(false);

  return (
    <div>
      <button className={styles.menu} onClick={() => setopen((prev) => !prev)}>
        {open ? <RxCross2 /> : <FaBars />}
      </button>
      {open && (
        <div className={styles.mobileDevice}>
          {Links.map((item) => (
            <NavLink item={item} key={item}></NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavBarIcon;
