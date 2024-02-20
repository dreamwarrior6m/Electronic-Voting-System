"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Protected from "../Protected/Protected";

const OpenCndidate = () => {
  const [openCandidate, setOpenCndidate] = useState();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    fetch("http://localhost:5000/candidate")
      .then((res) => res.json())
      .then((data) => {
        setOpenCndidate(data);
      });
  }, []);
  console.log(openCandidate);

  const filterCandidate = openCandidate?.filter(
    (candidat) => candidat?.voteName === id
  );
  console.log(filterCandidate);

  return (
    <Protected>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-center font-bold text-4xl pb-8">All Candidates</h1>
        <div className="grid md:grid-cols-2 gap-5">
          {filterCandidate?.map((candidate, index) => (
            <div
              key={candidate?._id}
              className={`${
                index % 2 === 0 ? "bg-gray-100 rounded-xl" : "bg-white"
              } text-center font-semibold rounded-xl`}
            >
              <div>
                <Image
                  src={candidate?.candidatePhoto}
                  width={150}
                  height={150}
                  alt="Image"
                  className="rounded-xl w-full h-auto md:h-[280px]"
                />
              </div>
              <div className="py-4 text-gray-600">
                <h2 className="font-bold text-xl">
                  Name: {candidate?.candidateName}
                </h2>
                <h2 className="">Email: {candidate?.candidateEmail}</h2>
                <h2 className="">Id: {candidate?.candidateID}</h2>
                <div className="">
                  <button className="bg-gray-600 px-4 py-2 rounded-xl mt-2 text-white">
                    More Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Protected>
  );
};

export default OpenCndidate;
