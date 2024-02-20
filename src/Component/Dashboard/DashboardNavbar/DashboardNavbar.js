"use client";
import { usePathname } from "next/navigation";
import { MdOutlineChat, MdSearch } from "react-icons/md";
import useAuth from "@/app/hook/useAuth";
import Image from "next/image";
import Notification from "@/Component/Notification/Notification";

const DashboardNavbar = () => {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <>
      <div className="text-white lg:flex lg:justify-between lg:items-center">
        <div className="hidden lg:block">{pathname.split("/").pop()}</div>
        <div className="flex items-center justify-center gap-4">
          <div className="hidden lg:block p-2 bg-blue-200/15 rounded-md">
            <div className="flex items-center justify-around">
              <input
                type="text"
                className="bg-transparent border-none"
                placeholder="Search..."
              />
              <MdSearch className="text-lg text-white/65" />
            </div>
          </div>
          <MdOutlineChat size={26} />
          <div className="">
            <Notification classes="mt-40" />
          </div>
          <div className="w-10 h-10">
            <Image
              className="w-full h-full rounded-full object-cover"
              height={50}
              width={50}
              src={user?.photoURL}
              alt="Profile Photo"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;
