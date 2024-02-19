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
    <div>
      <div className="text-white p-10">
        <div className="card  bg-base-100 shadow-xl flex md:flex-row">
          <div className="flex justify-center mx-auto">
            <div className="grid-cols-1 justify-between items-center lg:flex gap-10">
              <figure className="px-10 pt-10 ">
                <Image
                  src={filterAllVote?.[0].photo}
                  alt="alt"
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
              </figure>
              <div className=" items-center ">
                <h1 className=" text-2xl text-center font-bold mb-5   lg:text-5xl">
                  Election Name: {filterAllVote?.[0].name}{" "}
                </h1>
                <div className="mb-5">
                  <h2 className="text-green-400 text-xl   font-bold">
                    Start: {filterAllVote?.[0].startDate} (
                    {filterAllVote?.[0].startTime})
                  </h2>
                  <h2 className=" text-red-400 text-xl  font-bold">
                    End: {filterAllVote?.[0].endDate} (
                    {filterAllVote?.[0].endTime})
                  </h2>
                </div>

                <div className=" lg:mt-20 flex  gap-2">
                  <Link
                    href={`/participate/${filterAllVote?.[0].name}`}
                    className="btn btn-sm btn-primary"
                  >
                    Participate
                  </Link>
                  {/* <Link href={`/show-all-vote/candidate`}  className="btn btn-sm"> Candidates</Link> */}
                  <Link
                    href={`/show-all-vote/${filterAllVote?.[0].name}`}
                    className="btn btn-sm btn-primary "
                  >
                    {" "}
                    Candidates
                  </Link>
                  <Link
                    href={`/result/${filterAllVote?.[0].name}`}
                    className="btn btn-sm btn-primary"
                  >
                    {" "}
                    result
                  </Link>

                  <Link
                    href={`/share/${filterAllVote?.[0].name}`}
                    className="btn btn-sm btn-primary"
                  >
                    {" "}
                    Share
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end -mt-10">
                    <h1> share</h1>
                  </div>
      </div>
     
    </div>
  );
};

export default Page;
