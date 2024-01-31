"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const OpenCndidate = () => {
  const [openCandidate, setOpenCndidate] = useState();
  useEffect(() => {
    fetch("https://evs-delta.vercel.app/candidate")
      .then((res) => res.json())
      .then((data) => {
        setOpenCndidate(data);
      });
  }, []);
  console.log(openCandidate);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 justify-center p-5">
      {openCandidate?.map((candidate) => (
        <div key={openCandidate?._id} className=" ">
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <Image src={candidate?.candidatePhoto} alt="alt" width={300} height={300} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{candidate?.candidateName}</h2>
              <h2 className="">Admin email: {candidate?.adminEmail}</h2>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">More Info</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OpenCndidate;
