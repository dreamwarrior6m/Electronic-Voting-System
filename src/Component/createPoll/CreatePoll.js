/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";
import axios from "axios";

const createPoll = () => {
  const [addOpstionValue, setAddOpstionValue] = useState([]);
  const [addImgValue, setAddImgValue] = useState([]);
  const [titleValue, setTitleValue] = useState();
  const [descriptionValue, setDesctiptionValue] = useState();
  const [imageValue, setImageValue] = useState();
  const handleAdd = () => {
    const abc = [...addOpstionValue, []];
    setAddOpstionValue(abc);
    const imag = [...addImgValue, []];
    setAddImgValue(imag);
  };
  const handleChang = (onChangeValue, i) => {
    const inputdata = [...addOpstionValue];
    inputdata[i] = onChangeValue.target.value;
    setAddOpstionValue(inputdata);
  };
  // console.log(val, "data-");
  // console.log("image--", imgValue);
  //image value
  const handleChangImage = (onChangeImage, i) => {
    const inputImage = [...addImgValue];
    inputImage[i] = onChangeImage.target.value;
    setAddImgValue(inputImage);
  };
  const handleDelete = (i) => {
    const deletVal = [...addOpstionValue];
    deletVal.splice(i, 1);
    setAddOpstionValue(deletVal);

    const deletImgValue = [...addImgValue];
    deletImgValue.splice(i, 1);
    setAddImgValue(deletImgValue);
  };

  // title value
  const handleTitleChange = (e) => {
    setTitleValue(e?.target?.value);
  };
  //Description value
  const handleDescriptionChange = (e) => {
    setDesctiptionValue(e?.target?.value);
  };
  //image value
  const handleImageChange = (e) => {
    setImageValue(e?.target?.value);
  };
  // console.log(titleValue, "title")
  // console.log(descriptionValue, "description")
  // console.log(imageValue,'img')
  const createPollAllData = {
    titleValue,
    descriptionValue,
    imageValue,
    addOpstionValue,
    addImgValue,
  };
  console.log(createPollAllData);

  const handleCreatePoll = () => {
    axios
      .post("http://localhost:5000/create-poll", createPollAllData)
      .then((res) => {
        console.log(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="text-white">
      <div className="my-10 text-white">
        <div>
          <div className="w-full lg:max-w-[900px] mx-auto lg:px-6">
            <div className="py-2 lg:p-2 bg-[#f1faee] border-gray-200 lg:rounded-xl shadow-2xl dark:bg-gray-800 dark:border-gray-700">
              <div className="">
                <div className="grid  gap-3">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text dark:text-white">Title</span>
                    </label>

                    <input
                      onChange={(e) => handleTitleChange(e)}
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
                        Description (optional)
                      </span>
                    </label>

                    <textarea
                      onChange={(e) => handleDescriptionChange(e)}
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
                      onChange={(e) => handleImageChange(e)}
                      type="text"
                      placeholder="Photo Link"
                      className="input input-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                      name="photo"
                    />
                  </div>
                </div>

                <h2 className="">Answer Options</h2>
                <div className="grid grid-cols-2 gap-3 pt-6  ">
                  <div className=" ">
                    {addOpstionValue?.map((data, i) => {
                      return (
                        <div className="pb-3">
                          <input
                            placeholder={`${i + 1} Opstion`}
                            className="input static input-bordered rounded-sm border-l-8 border-blue-500 "
                            value={data}
                            onChange={(e) => handleChang(e, i)}
                          />
                          <button
                            onClick={() => handleDelete(i)}
                            className=""
                          >
                            
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="">
                    {addImgValue?.map((data2, i) => {
                      return (
                        <div className="pb-3">
                          <input
                            placeholder={`${i + 1} Image`}
                            className="input static input-bordered p-2 rounded-sm border-l-8 border-blue-500 "
                            value={data2}
                            onChange={(e) => handleChangImage(e, i)}
                          />

                          <button
                            onClick={() => handleDelete(i)}
                            className="btn btn-sm relative "
                          >
                            X
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <button className="btn btn-sm" onClick={() => handleAdd()}>
                    add
                  </button>
                </div>
              </div>

              <div className="form-control mt-6 w-full ">
                <button
                  onClick={handleCreatePoll}
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-sm border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Create Poll
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default createPoll;
