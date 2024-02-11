import Image from "next/image";
import { useEffect, useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import Swal from "sweetalert2";

const ElectionInfo = ({ election, refetch}) => {
  const Timer = ({ startDate1, endDate1 }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isSystemRunning, setSystemRunning] = useState(false);

    // Check if the system should start or stop
    useEffect(() => {
      const startDateTime = new Date(startDate1).getTime();
      const endDateTime = new Date(endDate1).getTime();

      if (
        currentTime.getTime() >= startDateTime &&
        currentTime.getTime() <= endDateTime
      ) {
        // Start the system
        setSystemRunning(true);
      } else {
        // Stop the system
        setSystemRunning(false);
      }
    }, [currentTime, startDate1, endDate1]);

    // Update the current time every second
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      // Cleanup function to clear the interval when the component is unmounted
      return () => clearInterval(timer);
    }, []);

    return (
      <div>
        <h2>
          <span className="font-bold">Current Status: </span>
          {isSystemRunning ? "Running" : "Stopped"}
        </h2>
      </div>
    );
  };

  const [loading, setloading] = useState(false);
  const handleCreateCandidate = async (event) => {
    event.preventDefault();
    const form = event.target;
    const candidateName = form.candidateName.value;
    const candidateID = form.candidateID.value;
    const candidatePhoto = form.candidatePhoto.value;
    const userID = form.userID.value;
    const candidateEmail = form.candidateEmail.value;
    const check = form.check.value;
    const brand = form.brand.value;
    const moderatorEmail = form.moderatorEmail.value;
    const voteName = form.electionName.value;
    const voteCount = 0;
    try {
      setloading(true);
      const candidate = {
        candidateName,
        candidateID,
        candidatePhoto,
        userID,
        candidateEmail,
        check,
        brand,
        moderatorEmail,
        voteName,
        voteCount,
      };

      console.log(candidate);

      const res = await fetch("https://evs-delta.vercel.app/candidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(candidate),
      });
      if (res.status === 400) {
        console.log(res);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Candidate Information is wrong",
          showConfirmButton: false,
          timer: 1500,
        });
        setloading(false);
      }
      if (res.status === 200) {
        console.log(res);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Candidate added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setloading(false);
        form.reset();
        refetch();
      } else {
        setloading(false);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Candidate Information is wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      setloading(false);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${err.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="grid grid-cols-2 justify-center items-center">
      <div className="">
        <p>
          <span className="font-bold">Organization Name: </span>
          {election?.OrganizatonName}
        </p>
        <p>
          <span className="font-bold">Election Name: </span>
          {election?.name}
        </p>
        <Timer
          startDate1={`${election?.startDate}T${election?.startTime}`}
          endDate1={`${election?.endDate}T${election?.endTime}`}
        />
        <p>
          <span className="font-bold">Email: </span> {election?.email}
        </p>
        <p className="mt-3 text-3xl font-bold mb-1">Create Candidate</p>
        <button
          onClick={() =>
            document.getElementById(`my_modal_3_${election._id}`).showModal()
          }
          className="bg-green-500 text-white px-4 py-[10px] rounded-md"
        >
          <IoPersonAdd />
        </button>
      </div>
      <Image
        className="rounded-md"
        width={150}
        height={150}
        alt="logo"
        src={election?.photo}
      />
      <>
        <dialog id={`my_modal_3_${election._id}`} className="modal">
          <div className="modal-box bg-slate-200 ">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-3xl text-center mb-[10px]">
              Create Candidate
            </h3>
            <form onSubmit={handleCreateCandidate}>
              <div className="grid gap-4">
                <div>
                  <div className="form-control">
                    <label className="label">
                      <span className=" text-gray-800 dark:text-white">
                        Candidate Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Candidate Name"
                      className="input input-bordered py-2 rounded-lg border-blue-500 border-l-8 mb-2 text-gray-800 dark:text-white"
                      required
                      name="candidateName"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className=" text-gray-800 dark:text-white">
                        Candidate ID Card Number
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Candidate ID Number"
                      className="input input-bordered py-2 rounded-lg border-blue-500 border-l-8 mb-2 text-gray-800 dark:text-white"
                      required
                      name="candidateID"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className=" text-gray-800 dark:text-white">
                        Your ID Card Number
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your ID Number"
                      className="input input-bordered py-2 rounded-lg border-blue-500 border-l-8 mb-2 text-gray-800 dark:text-white"
                      required
                      name="userID"
                    />
                  </div>
                </div>
                <div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className=" text-gray-800 dark:text-white">
                        Upload Candidate Photo
                      </span>
                    </label>
                    <input
                      required
                      name="candidatePhoto"
                      type="text"
                      className=" input input-bordered py-2 rounded-lg border-blue-500 border-l-8 mb-2 text-gray-800 dark:text-white"
                      placeholder="Enter photo link"
                    />
                  </div>
                </div>
                <div>
                  <div className="form-control">
                    <label className="label">
                      <span className=" text-gray-800 dark:text-white">
                        Candidate E-mail
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="Candidate E-mail"
                      className="input input-bordered py-2 rounded-lg border-blue-500 border-l-8 mb-2 text-gray-800 dark:text-white"
                      required
                      name="candidateEmail"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className=" text-gray-800 dark:text-white">
                        Candidate Brand Name
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered py-2 rounded-lg border-blue-500 border-l-8 mb-2 text-gray-800 dark:text-white"
                      name="brand"
                      required
                      placeholder="Enter Brand Name"
                    />
                  </div>
                </div>
                <label className="label">
                  <div className="flex gap-1 text-gray-800 dark:text-white">
                    <input type="checkbox" name="check" id="" required />
                    Agree to continue
                  </div>
                  <span className="text-gray-800 dark:text-white"> </span>
                </label>
              </div>
              <input
                type="hidden"
                name="moderatorEmail"
                value={election?.email}
              />
              <input type="hidden" name="electionName" value={election?.name} />

              <div className="form-control mt-3 w-full ">
                <button
                  disabled={loading}
                  onClick={() =>
                    document
                      .getElementById(`my_modal_3_${election._id}`)
                      .close()
                  }
                  className="input input-bordered bg-slate-700 text-white rounded-lg mb-2 py-3  w-full col-span-2 mt-[10px]"
                >
                  {loading ? "Loading..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </>
    </div>
  );
};

export default ElectionInfo;
