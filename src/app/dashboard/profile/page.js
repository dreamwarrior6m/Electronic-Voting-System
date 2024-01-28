"use client";
import useAuth from "@/app/hook/useAuth";
import { FaRegCopy } from "react-icons/fa";

import Image from "next/image";
const Page = () => {
  const { user } = useAuth();
  return (
    <div className="bg-lime-500">
      <div className="  ">
        <div className="card w-full h-full  shadow-xl image-full ">
          <div className="flex gap-5 items-center card-body ">
            <Image
              className="w-[150px] h-[150px] rounded-full border-4 border-red-200"
              src={user?.photoURL ? user?.photoURL : userProfile}
              width={500}
              height={500}
              alt="profile"
            ></Image>
            <div className="flex gap-2 items-center">
              <p> ID: 4654214521 </p>
              <FaRegCopy />
            </div>

            {user && (
              <h1 className="text-5xl text-white font-semibold">
                {user?.displayName}
              </h1>
            )}

            <hr />
            <div className="">
              <div className="grid lg:grid-cols-2 gap-10">
                <div>
                  <h2 className="text-xl font-bold">Full Name</h2>
                  <p>Chandon Kumar Mundol</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Email</h2>
                  <p>chandonkuma2023@gmail.com</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Date Of Birdth</h2>
                  <p>28/4/2003</p>
                </div>
                <div>
                  <h2 className="text-xl font-bold">ID Number</h2>
                  <p>6565454878</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
