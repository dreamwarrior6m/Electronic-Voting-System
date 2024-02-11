import Image from "next/image";

const ElectionCandidate = ({ candidate, index, refetch }) => {
  return (
    <div className="border-2 rounded-xl">
      <div
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
            className="rounded-t-xl w-full "
          />
        </div>
        <div className="py-4">
          <h2 className="">Name: {candidate?.candidateName}</h2>
          {/* <h2 className="">Email: {candidate?.candidateEmail}</h2> */}
          <h2 className="">Id: {candidate?.candidateID}</h2>
          <div className="text-sm font-normal">
            <button className="bg-gray-700 text-white px-2 py-1 rounded-md">More Info</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionCandidate;
