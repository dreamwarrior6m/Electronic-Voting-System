"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const [allVote, setAllVote] = useState();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios
      .get("https://evs-delta.vercel.app/create-vote")
      .then((res) => {
        setAllVote(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  //   console.log(allVote);

  const filterAllVote = allVote?.filter((allVot) => allVot?.name == id);
  console.log(filterAllVote);

  return (
    <div className="min-h-screen max-w-7xl mx-auto pt-14">
      <div className="text-white pt-10 md:px-8 px-3">
        <h1 className=" text-2xl text-center font-semibold mb-5   lg:text-4xl">
          Name: {filterAllVote?.[0].OrganizatonName}{" "}
        </h1>
        
        <div className=" bg-gray-800 rounded-md">
        <div className=" card flex md:flex-row justify-center items-center">
          <div className="flex justify-center mx-auto items-center">
            <div className="grid-cols-1 justify-between items-center lg:flex gap-32">
              <figure className="px-10 pt-10">
                <Image
                  src={filterAllVote?.[0].photo}
                  alt="alt"
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
              </figure>
              <div className="flex items-center justify-center py-6 md:py-0">
                <div className="mb-5">
                  <h2 className="text-xl  font-bold">
                    Type: {filterAllVote?.[0]?.Type}
                  </h2>
                  <h2 className="text-green-400 text-xl   font-bold">
                    Start: {filterAllVote?.[0].startDate} (
                    {filterAllVote?.[0].startTime})
                  </h2>
                  <h2 className=" text-red-400 text-xl  font-bold">
                    End: {filterAllVote?.[0].endDate} (
                    {filterAllVote?.[0].endTime})
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" lg:mt-20 flex  gap-2 justify-center items-center pb-8">
          <Link
            href={`/participate/${filterAllVote?.[0].name}`}
            className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
          >
            Participate
          </Link>
          {/* <Link href={`/show-all-vote/candidate`}  className="btn btn-sm"> Candidates</Link> */}
          <Link
            href={`/show-all-vote/${filterAllVote?.[0].name}`}
            className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
          >
            {" "}
            Candidates
          </Link>
          <Link
            href={`/result/${filterAllVote?.[0].name}`}
            className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
          >
            {" "}
            result
          </Link>

          <Link
            href={`/share/${filterAllVote?.[0].name}`}
            className="text-[16px] border py-1 px-2 border-blue-600 rounded-md hover:bg-blue-300 font-semibold bg-blue-500"
          >
            {" "}
            Share
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
