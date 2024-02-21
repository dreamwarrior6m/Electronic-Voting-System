import Protected from "@/Component/Protected/Protected";
import Image from "next/image";

const ElectionCandidate = ({ candidate, index, refetch }) => {
  return (
    <Protected>
      <div className="">
        <div
          className={`${
            index % 2 === 0 ? "bg-gray-400" : "bg-gray-500"
          } font-semibold border-2 pr-8 rounded-xl grid grid-cols-2 justify-center items-center  w-80`}
        >
          <div>
            <Image
              src={candidate?.candidatePhoto}
              width={130}
              height={130}
              alt="Image"
              className=" rounded-l-xl "
            />
          </div>
          <div className="">
            <h2 className="">{candidate?.candidateName}</h2>
            <h2 className="">ID: {candidate?.candidateID}</h2>
            <h2 className="">{candidate?.candidateEmail}</h2>
          </div>
        </div>
      </div>
    </Protected>
  );
};

export default ElectionCandidate;
