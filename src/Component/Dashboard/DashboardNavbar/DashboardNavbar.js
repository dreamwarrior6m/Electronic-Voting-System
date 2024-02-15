"use client";
import { usePathname } from "next/navigation";
import "./Notification.css";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import useAuth from "@/app/hook/useAuth";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const DashboardNavbar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const notificationRef = useRef(null);
  const [newStatus, setNewStatus] = useState(false);
  const pathname = usePathname();

  const { data: allNotifications = [], refetch } = useQuery({
    queryKey: ["notification1"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/notification");
      return res.data;
    },
    refetchInterval: 1000,
  });

  const filterNotifications = allNotifications?.filter(
    (notification) =>
      notification.senderEmail === user?.email ||
      notification.receiverEmail === user?.email
  );

  useEffect(() => {
    if (filterNotifications.length !== 0) {
      refetch();
      setNewStatus(true);
    }
  }, [filterNotifications.length, refetch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationRef]);

  const handleToggleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
    setNewStatus(false);
  };

  const notificationDelete = () => {
    axios
      .delete(`https://evs-delta.vercel.app/notification/${user?.email}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Successfully",
            text: "Notifications Deleted",
            icon: "success",
            confirmButtonText: "oky",
          });
          refetch();
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const displayNotification = ({ type, senderEmail, electionName }) => {
    let action;
    let email;

    if (type === 1) {
      action = "Delete";
    } else if (type === 2) {
      action = "Update";
    }

    if (senderEmail === user?.email) {
      email = "You";
    } else {
      email = senderEmail;
    }

    return (
      <p className="notification">
        <span className="font-bold">{email}</span> {action} your{" "}
        <span className="font-bold">{electionName}</span> Election.
      </p>
    );
  };

  return (
    <>
      <div className="text-white flex justify-between items-center">
        <div>{pathname.split("/").pop()}</div>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center p-2 bg-blue-200/15 rounded-md">
            <MdSearch className="mx-3" />
            <input
              type="text"
              className="bg-transparent border-none"
              placeholder="Search..."
            />
          </div>
          <MdOutlineChat size={26} />
          <div className="">
            <div>
              <button
                className="flex justify-center items-center"
                onClick={handleToggleOpen}
              >
                <MdNotifications size={26} />
                <div
                  className={`absolute -mt-[22px] ml-5 ${
                    newStatus ? "" : "hidden"
                  }`}
                >
                  <h1 className=" bg-red-600 rounded-full text-[9px] px-1 drop-shadow-md">
                    new
                  </h1>
                </div>
              </button>
              <div className={`${open ? "" : "hidden"}`}>
                <div
                  className="notifications max-w-[300px] max-h-[500px] overflow-y-auto z-10 bg-white scrollbar-width-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                  ref={notificationRef}
                >
                  {filterNotifications.length > 0 ? (
                    filterNotifications
                      .slice()
                      .reverse()
                      .map((message, index) => (
                        <span
                          className="bg-white p-3 rounded-md"
                          key={index + 1}
                        >
                          {displayNotification(message)}
                        </span>
                      ))
                  ) : (
                    <span>No notifications found.</span>
                  )}
                  <button
                    className="bg-gray-500 py-1 rounded-md"
                    onClick={() => notificationDelete()}
                  >
                    Delete All
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-10 h-10">
            <Image
              className="w-full h-full rounded-full object-cover"
              height={50}
              width={50}
              src={user?.photoURL}
              alt="Profile Photo"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;
