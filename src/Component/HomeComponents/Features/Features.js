"use client";
import React from "react";
import { GiVote } from "react-icons/gi";
import { FaVoteYea } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";

const Features = () => {
  return (
    <div className="mb-[74px] max-w-7xl mx-auto pt-10">
      <div className="flex items-center gap-8"></div>
      <div className="">
        <p className="mt-2 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200 tracking-tight sm:text-4xl">
          Core Features
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 mt-12">
        <div className="flex flex-col justify-center items-center bg-[#f1faee] text-indigo-500 dark:text-indigo-400 py-12 lg:rounded-md">
          <p className="text-3xl font-bold mb-3">Organize Election</p>
          <IoCreate className="text-[50px]" />
        </div>
        <div className="flex flex-col justify-center items-center bg-[#f1faee] text-indigo-500 dark:text-indigo-400 py-12 lg:rounded-md">
          <p className="text-3xl font-bold mb-[7px]">Live voting</p>
          <GiVote className="text-[55px]" />
        </div>
        <div className="flex flex-col justify-center items-center bg-[#f1faee] text-indigo-500 dark:text-indigo-400 py-12 lg:rounded-md">
          <p className="text-3xl font-bold mb-4">Organize Poll</p>
          <FaVoteYea className="text-[50px]" />
        </div>
      </div>
    </div>
  );
};

export default Features;
