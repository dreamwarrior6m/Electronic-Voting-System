"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const ShowAllvote = () => {
  const [showAllVote, setShowAllVote] = useState();
  useEffect(() => {
    fetch("https://evs-delta.vercel.app/create-vote")
      .then((res) => res.json())
      .then((data) => {
        setShowAllVote(data);
      });
  }, []);
  console.log(showAllVote);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
      {showAllVote?.map((allVote, ind) => (
        <div key={allVote._id} className="">
          <div className="card bg-neutral text-neutral-content">
            <div className="card-body items-center text-center">
              <h2 className="card-title">{allVote?.OrganizatonName}</h2>
              <p>Vote name: {allVote?.name}</p>
              <p>Email: {allVote?.email}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-primary">Participate</button>
                {/* <Link href={`/show-all-vote/candidate`}  className="btn btn-sm"> Candidates</Link> */}
                <Link href={`/show-all-vote/${allVote?.name}`}  className="btn btn-sm"> Candidates</Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowAllvote;