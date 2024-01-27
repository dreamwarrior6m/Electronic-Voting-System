import React from "react";
import styles from "./Footer.module.css";
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#00263A]  pt-10 pb-8 ">
      <div className="max-w-7xl mx-auto">
        <section className="flex flex-col text-center">
          <h1 className="text-white font-bold text-4xl mb-1">DVS</h1>
          <p className="text-2xl font-medium text-white">Digital Voting System</p>
        </section>
        <h1 className="block h-[1.2px] w-8/12 mx-auto rounded-full bg-white/70 my-5"></h1>
        <section className="flex flex-col gap-3 ">
          <div className="flex justify-center gap-3">
            <button className="text-gray-800 bg-white rounded-full p-2 hover:text-white hover:bg-gray-800  transition">
              <FaFacebookF></FaFacebookF>
            </button>
            <button className="text-gray-800 bg-white rounded-full p-2 hover:text-white hover:bg-gray-800 transition">
              <BsInstagram></BsInstagram>
            </button>
            <button className="text-gray-800 bg-white rounded-full p-2 hover:text-white hover:bg-gray-800  transition">
              <BsTwitter></BsTwitter>
            </button>
            <button className="text-gray-800 bg-white rounded-full p-2 hover:text-white hover:bg-gray-800  transition">
              <FaLinkedin></FaLinkedin>
            </button>
            <button className="text-gray-800 bg-white rounded-full p-2 hover:text-white hover:bg-gray-800  transition">
              <BsYoutube></BsYoutube>
            </button>
          </div>
          <div className="text-center text-white">
            <p>© 2023 Automotive. All Rights Reserved.</p>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
