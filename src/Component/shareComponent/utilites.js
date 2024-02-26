import axios from "axios";

export const UploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    // console.log(formData)
  const { data } =await axios.post(`https://api.imgbb.com/1/upload?key=92f4a66fcf6d66968046a4c4683192cc`, formData);


    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};