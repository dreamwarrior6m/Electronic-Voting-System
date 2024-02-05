"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const Results = () => {
  const [candidates, setCandidates] = useState();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    fetch("https://evs-delta.vercel.app/candidate")
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
    <div className="text-white grid grid-cols-1 md:grid-cols-3 p-5 gap-5">
      {filterCandidates?.map((candi) => (
        <div key={candi?._id} className="">
          <div className="card  bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <Image
                src={candi?.candidatePhoto}
                alt="alt"
                width={300}
                height={300}
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">
                Total Vote:{" "}
                <span className="text-xl font-bold text-red-600">
                  {candi?.voteCount}
                </span>
              </h2>
              <p>Name: {candi?.candidateName}</p>
               
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Results;
