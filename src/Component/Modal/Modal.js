import useAuth from "@/app/hook/useAuth";
import axios from "axios";
import { useState } from "react";
import { VscUnverified } from "react-icons/vsc";
import { CgClose } from "react-icons/cg";

const Modal = ({ electionId, buttonName, type }) => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleOpenModal = async (id) => {
    setModalOpen(true);
    const res = await axios.get(
      `https://evs-delta.vercel.app/create-vote/${id}`
    );
    setData(res.data);
  };
  console.log(data?.name);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const candidateName = form.name.value;
    const candidateEmail = form.email.value;
    const candidatePhoto = form.photo.value;
    const voteName = form.candidate.value;
    const candidateID = form.candidateID.value;
    const brand = form.brand.value;
    const isVerify = false;
    const moderatorEmail = data?.email;
    const voteCount = 0;

    const formData = {
      candidateName,
      candidateEmail,
      voteName,
      candidatePhoto,
      isVerify,
      moderatorEmail,
      voteCount,
      candidateID,
      brand,
    };

    console.log("Form Data:", formData);
    handleModalClose();

    // axios
    //   .post(`https://evs-delta.vercel.app/candidate/under/users`, formData)
    //   .then((response) => {
    //     console.log(response.data);
    //     handleModalClose();
    //     if (res.data.insertedId) {
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "error",
    //         title: "some thing is Wrong",
    //         showConfirmButton: false,
    //         timer: 2000,
    //       });
    //
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("There was an error!", error);
    //   });
  };

  return (
    <>
      <button
        onClick={() => handleOpenModal(electionId)}
        className="flex justify-center items-center text-lg border border-green-500 px-2 py-1 rounded-xl hover:bg-green-200 gap-1"
      >
        <VscUnverified /> <span className="text-[16px]">{buttonName}</span>
      </button>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="relative mt-10 p-8 rounded-lg bg-gray-800 text-white w-full sm:max-w-md">
            <button
              className="absolute top-0 right-0 p-5 text-red-400"
              onClick={handleModalClose}
            >
              <CgClose />
            </button>
            <h2 className="text-2xl font-bold mb-4">{buttonName}</h2>
            <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-2">
              <div className="mb-1 text-left">
                <label className="mb-1 font-normal text-sm">Name</label>
                <input
                  type="text"
                  disabled
                  defaultValue={user?.displayName}
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border-none text-black bg-gray-200 rounded text-sm font-normal focus:bg-gray-400"
                />
              </div>

              <div className="mb-1 text-left">
                <label className="mb-1 font-normal text-sm">Email</label>
                <input
                  type="email"
                  id="email"
                  disabled
                  defaultValue={user?.email}
                  name="email"
                  className="w-full px-3 py-2 border-none text-black bg-gray-200 rounded text-sm font-normal focus:bg-gray-400"
                />
              </div>
              <div className="mb-1 text-left">
                <label className="mb-1 font-normal text-sm">Photo</label>
                <input
                  type="text"
                  id="photo"
                  disabled
                  defaultValue={user?.photoURL}
                  name="photo"
                  className="w-full px-3 py-2 border-none text-black bg-gray-200 rounded text-sm font-normal focus:bg-gray-400"
                />
              </div>
              <div className="mb-1 text-left">
                <label className=" mb-1 font-normal text-sm">
                  Under Candidate:
                </label>
                <input
                  type="text"
                  id=""
                  disabled
                  defaultValue={data?.name}
                  name="candidate"
                  className="w-full px-3 py-2 border-none text-black bg-gray-200 rounded text-sm font-normal focus:bg-gray-400"
                />
              </div>
              <div className="mb-1 text-left">
                <label className=" mb-1 font-normal text-sm">
                  ID Card Number
                </label>
                <input
                  type="text"
                  id="text"
                  required
                  placeholder="Enter Your Id"
                  name="candidateID"
                  className="w-full px-3 py-2 border-none text-black bg-gray-200 rounded text-sm font-normal focus:bg-gray-400"
                />
              </div>
              <div className="mb-1 text-left">
                <label className=" mb-1 font-normal text-sm">
                  Brand Name
                </label>
                <input
                  type="text"
                  id="text"
                  required
                  placeholder="Enter Your Brand Name"
                  name="brand"
                  className="w-full px-3 py-2 border-none text-black bg-gray-200 rounded text-sm font-normal focus:bg-gray-400"
                />
              </div>
              <button type="submit" className="text-sm font-normal px-4 py-2 rounded-md border border-white text-white">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
