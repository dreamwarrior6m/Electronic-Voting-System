"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

const OpenCndidate = () => {
  const [openCandidate, setOpenCndidate] = useState();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    fetch("https://evs-delta.vercel.app/candidate")
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
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 justify-center p-5">
      {filterCandidate?.map((candidate) => (
        <div key={filterCandidate?._id} className=" ">
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <Image
                src={candidate?.candidatePhoto}
                alt="alt"
                width={300}
                height={300}
              />
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
