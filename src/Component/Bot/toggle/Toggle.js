"use client";
import { FaRobot } from "react-icons/fa";
import Chat from "../chat/Chat";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const Toggle = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };
  return (
    <div>
      {show ? <Chat /> : ""}
      <div  className="flex justify-end">
        {show ? (
          <IoClose onClick={handleHide} className="text-5xl text-white bg-gradient-to-r from-purple-800 to-indigo-700 p-2 rounded-full drop-shadow-2xl mt-3" />
        ) : (
          <FaRobot onClick={handleShow} className="text-5xl text-white bg-gradient-to-r from-purple-800 to-indigo-700 p-2 rounded-full drop-shadow-2xl mt-3" />
        )}
      </div>
    </div>
  );
};

export default Toggle;
