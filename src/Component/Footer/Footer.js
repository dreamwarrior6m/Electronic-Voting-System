import React from "react";
import styles from "./Footer.module.css";
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="pt-10 pb-6 bg-gray-900 border-t-[1px] border-white/10 text-white">
        <div className="footer grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto justify-items-center opacity-95">
          <nav>
            <div className="max-w-7xl mx-auto">
              <section className="flex flex-col text-center">
                <h1 className="text-white font-bold text-4xl mb-1">DVS</h1>
                <p className="text-2xl font-medium text-white">
                  Digital Voting System
                </p>
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
              </section>
            </div>
          </nav>
          <nav>
            <header className="footer-title">Services</header>
            <a className="link link-hover text-[#5E61E5]">Poll</a>
            <a className="link link-hover text-[#5E61E5]">Q&A</a>
            <a className="link link-hover text-[#5E61E5]">Ranking</a>
          </nav>
          <nav>
            <header className="footer-title">Legal</header>
            <a className="link link-hover text-[#5E61E5]">Terms of use</a>
            <a className="link link-hover text-[#5E61E5]">Privacy policy</a>
            <a className="link link-hover text-[#5E61E5]">Cookie policy</a>
          </nav>
          <nav>
            <header className="footer-title">Support</header>
            <a className="link link-hover text-[#5E61E5]">Pricing</a>
            <a className="link link-hover text-[#5E61E5]">Help Center</a>
            <a className="link link-hover text-[#5E61E5]">Guide</a>
            <a className="link link-hover text-[#5E61E5]">F.A.Q</a>
          </nav>
        </div>
      </footer>
      <footer className="px-10 py-8 bg-gray-900 text-white">
        <div className="footer footer-center  max-w-5xl mx-auto">
          <aside>
            <p>© 2023 Automotive. All Rights Reserved.</p>
          </aside>
        </div>
      </footer>
    </>
  );
};

export default Footer;
