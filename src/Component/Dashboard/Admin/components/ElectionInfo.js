import useAuth from "@/app/hook/useAuth";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import Swal from "sweetalert2";

const ElectionInfo = ({ election, refetch }) => {
  const [userRoles, setUserRoles] = useState({});
  const { user } = useAuth();
  useEffect(() => {
    axios
      .get(`https://evs-delta.vercel.app/users/${user?.email}`,{
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUserRoles(res.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [user]);
  // console.log("User: ", userRoles);

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

  const handleCreateCandidate = async (event) => {
    event.preventDefault();
    const form = event.target;
    const candidateName = form.candidateName.value;
    const candidateID = form.candidateID.value;
    const candidatePhoto = form.candidatePhoto.value;
    const candidateEmail = form.candidateEmail.value;
    const brand = form.brand.value;
    const moderatorEmail = form.moderatorEmail.value;
    const voteName = form.electionName.value;
    const voteCount = 0;

    const candidate = {
      candidateName,
      candidateID,
      candidatePhoto,
      candidateEmail,
      brand,
      moderatorEmail,
      voteName,
      voteCount,
    };

    // console.log(candidate);

    axios
      .post(`https://evs-delta.vercel.app/candidate`, candidate)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Apply Successfully",
            showConfirmButton: false,
            timer: 2000,
          });
          form.reset();
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    //When User create a Candidate notification send to backend.
    const type = 4;
    const notification = {
      senderEmail: user?.email,
      receiverEmail: user?.email,
      type: type,
      electionName: election?.name,
    };

    axios
      .post("https://evs-delta.vercel.app/notification", notification)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    form.reset();
    refetch();
  };

  return (
    <div className="grid grid-cols-2 text-[18px]">
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
        <div>
          {userRoles?.isRole !== "Admin" && (
            <div className="">
              <p className="mt-3 text-2xl font-bold mb-1">Create Candidate</p>
              <button
                onClick={() =>
                  document
                    .getElementById(`my_modal_3_${election._id}`)
                    .showModal()
                }
                className="bg-green-500 text-white px-4 py-[10px] rounded-md"
              >
                <IoPersonAdd />
              </button>
            </div>
          )}
        </div>
      </div>
      <Image
        className="rounded-full w-[110px] h-[110px] object-cover"
        width={110}
        height={110}
        alt="logo"
        src={election?.photo}
      />
      <>
        <dialog id={`my_modal_3_${election._id}`} className="modal">
          <div className="modal-box bg-gray-900">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-3xl text-center mb-[10px]">
              Create Candidate
            </h3>
            <form onSubmit={handleCreateCandidate}>
              <div className="">
                <div>
                  <div className="form-control">
                    <label className="label">
                      <span className=" text-white text-base">
                        Candidate Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Candidate Name"
                      className="input input-bordered py-2 rounded-lg border-blue-500 border-l-8 mb-2 bg-slate-400 text-white"
                      required
                      name="candidateName"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className=" text-white text-base">
                        Candidate ID
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Candidate ID Number"
                      className="input input-bordered py-2 rounded-lg border-blue-500 border-l-8 mb-2 bg-slate-400 text-white"
                      required
                      name="candidateID"
                    />
                  </div>
                </div>
                <div>
                  <div className="form-control">
                    <label className="label">
                      <span className=" text-white text-base">
                        Upload Candidate Photo
                      </span>
                    </label>
                    <input
                      required
                      name="candidatePhoto"
                      type="text"
                      className=" input input-bordered py-2 rounded-lg border-blue-500 border-l-8 mb-2 bg-slate-400 text-white"
                      placeholder="Enter photo link"
                    />
                  </div>
                </div>
                <div>
                  <div className="form-control">
                    <label className="label">
                      <span className=" text-white text-base">
                        Candidate E-mail
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="Candidate E-mail"
                      className="input input-bordered py-2 rounded-lg border-blue-500 border-l-8 mb-2 bg-slate-400 text-white"
                      required
                      name="candidateEmail"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className=" text-white text-base">
                        Candidate Brand Name
                      </span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered py-2 rounded-lg border-blue-500 border-l-8 mb-2 bg-slate-400 text-white"
                      name="brand"
                      required
                      placeholder="Enter Brand Name"
                    />
                  </div>
                </div>
              </div>
              <input
                type="hidden"
                name="moderatorEmail"
                value={election?.email}
              />
              <input type="hidden" name="electionName" value={election?.name} />

              <div className="form-control mt-3 w-full ">
                <button
                  onClick={() =>
                    document
                      .getElementById(`my_modal_3_${election._id}`)
                      .close()
                  }
                  className="input input-bordered bg-slate-700 text-white rounded-lg mb-2 py-3  w-full col-span-2 mt-[10px]"
                >
                  Create
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
