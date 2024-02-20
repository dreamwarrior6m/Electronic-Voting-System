"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Protected from "../Protected/Protected";

const Results = () => {
  const [candidates, setCandidates] = useState();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    fetch("http://localhost:5000/candidate")
      .then((res) => res.json())
      .then((data) => {
        setCandidates(data);
      });
  }, []);
  console.log(candidates);

  const filterCandidates = candidates?.filter(
    (candidate) => candidate?.voteName === id
  );
  console.log(filterCandidates);

  return (
    <Protected>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-center font-bold text-4xl pb-8">Results</h1>
        <div className="grid md:grid-cols-2 gap-5">
          {filterCandidates?.map((candidate, index) => (
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
              <div className="py-4 text-gray-600 font-bold text-lg">
                <h2 className="">Id: {candidate?.candidateID}</h2>
                <h2 className="">Name: {candidate?.candidateName}</h2>

                <h2 className="">
                  <span className="text-3xl text-red-600">
                    {candidate?.voteCount}
                  </span>{" "}
                  Votes Got
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Protected>
  );
};

export default Results;
