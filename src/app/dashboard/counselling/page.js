import { TfiAlert } from "react-icons/tfi";

const page = () => {
  return (
    <div>
      <div>
        <div className="">
          <div>
            <h2 className="text-4xl font-bold text-center text-white mt-5">
              Create counselling{" "}
            </h2>
            <div className="my-8 p-6 bg-gray-800 rounded-md shadow-md">
              <h2 className="text-3xl font-bold text-center text-white"></h2>
              <div className="flex justify-center mx-auto"></div>
              <div className="hero">
                <div className="hero-content  ">
                  <div className=" w-full   ">
                    <form className="card-body">
                      <div className="grid lg:grid-cols-3 gap-4">
                        <div>
                          <div className="form-control">
                            <label className="label">
                              <span className=" text-white">
                                Candidate Name
                              </span>
                            </label>
                            <input
                              type="text"
                              placeholder="Candidate Name"
                              className="w-full px-4 py-3  bg-gray-700 text-white rounded-md focus:outline-none focus:border-indigo-500"
                              required
                              name="candidateName"
                            />
                          </div>
                          <div className="form-control mt-3">
                            <label className="label">
                              <span className=" text-white">
                                Organization Name
                              </span>
                            </label>
                            <input
                              type="text"
                              placeholder="Organizaton Name"
                              className="w-full px-4 py-3  bg-gray-700 text-white rounded-md focus:outline-none focus:border-indigo-500"
                              required
                              name="candidateID"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="form-control">
                            <label className="label">
                              <span className=" text-white">Upload Photo</span>
                            </label>
                            <input
                              required
                              name="candidatePhoto"
                              type="file"
                              className="file-input file-input-bordered w-full max-w-xs bg-gray-700"
                            />
                          </div>
                          <div className="form-control mt-3">
                            <label className="label">
                              <span className=" text-white">
                                Organization Type
                              </span>
                            </label>
                            <input
                              type="text"
                              placeholder="Organization Type"
                              className="w-full px-4 py-3  bg-gray-700 text-white rounded-md focus:outline-none focus:border-indigo-500"
                              required
                              name="type"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="form-control">
                            <label className="label">
                              <span className=" text-white">Commitment</span>
                            </label>
                            <textarea
                              name="c"
                              id=""
                              cols="18"
                              rows="6"
                              placeholder="Type your commitment"
                              className="bg-gray-600 text-white"
                            ></textarea>
                          </div>
                        </div>
                        <label className="label">
                          <div className="flex gap-1 text-white">
                            <input
                              type="checkbox"
                              name="check"
                              id=""
                              required
                            />
                            Agree to continue
                          </div>
                          <span className="text-white "> </span>
                        </label>
                      </div>

                      <div className="form-control mt-3 w-full ">
                        <button className="p-2 font-bold button text-white bg-gray-500 shadow-2xl hover:bg-slate-400 rounded-sm">
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-yellow-100 text-black rounded-md">
              <div className="flex gap-2">
                <span className="text-2xl text-red-300 font-extrabold">
                  {" "}
                  <TfiAlert />
                </span>
                <h2>
                  Provide correct information. Incorrect information is not
                  acceptable.Thank You
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
