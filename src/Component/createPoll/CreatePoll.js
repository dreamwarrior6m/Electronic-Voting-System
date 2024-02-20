/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import useAuth from "@/app/hook/useAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import Protected from "../Protected/Protected";

const createPoll = () => {
  const { user } = useAuth();
  const wonerEmail = user?.email;
  const router = useRouter();
  console.log(wonerEmail);
  const handleCreatePoll = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const userName = form.userName.value;
    const description = form.description.value;
    const photo = form.photo.value;
    const createPoll = { title, userName, description, photo, wonerEmail };
    console.log(createPoll);

    axios
      .post("https://evs-delta.vercel.app/create-poll", createPoll)
      .then((res) => {
        console.log(res);
        router.push(`/createpoll/${userName}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <Protected>
      <div className="text-white">
        <div className="my-10 text-white">
          <div>
            <div className="w-full lg:max-w-[900px] mx-auto lg:px-6">
              <form onSubmit={handleCreatePoll}>
                <div className="py-2 lg:p-2 bg-[#f1faee] border-gray-200 lg:rounded-xl shadow-2xl dark:bg-gray-800 dark:border-gray-700">
                  <div className="">
                    <div className="grid  gap-3">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text dark:text-white">
                            Title
                          </span>
                        </label>

                        <input
                          type="text"
                          required
                          placeholder="Type your question"
                          className="input input-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                          name="title"
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text dark:text-white">
                            User Name
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="User Name must unique"
                          className="input input-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                          required
                          name="userName"
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text dark:text-white">
                            Description (optional)
                          </span>
                        </label>

                        <textarea
                          type="text"
                          placeholder="Type your question"
                          className="textarea textarea-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                          name="description"
                        />
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text dark:text-white">
                            Add Image (optional)
                          </span>
                        </label>
                        <input
                          type="img"
                          placeholder="Photo Link"
                          className="input input-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                          name="photo"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-control mt-6 w-full ">
                    <button className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-sm border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                      N E X T
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Protected>
  );
};

export default createPoll;
