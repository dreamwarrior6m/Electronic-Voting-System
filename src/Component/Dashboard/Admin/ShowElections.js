"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Protected from "@/Component/Protected/Protected";

const ShowElections = () => {
  const { data: elections = [], refetch } = useQuery({
    queryKey: ["elections1"],
    queryFn: async () => {
      const res = await axios.get("https://evs-delta.vercel.app/create-vote");
      return res.data;
    },
  });

  return (
    <Protected>
      <div>
        <div>
          <h3 className="text-3xl font-bold text-gray-700 text-center py-3">
            All Elections
          </h3>
        </div>
        <div className="grid gap-5 ">
          {elections?.map((election, index) => (
            <div
              key={election._id}
              className={`${
                index % 2 === 0 ? "bg-gray-100 rounded-xl" : "bg-white"
              } text-center font-semibold rounded-xl`}
            >
              <div className="grid grid-cols-5 py-5 items-center">
                <p className="text-black">{index + 1}</p>
                <p>{election?.OrganizatonName}</p>
                <p>{election?.name}</p>
                <p>Running</p>

                <Link href={`/dashboard/allElections/${election._id}`}>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Protected>
  );
};

export default ShowElections;
