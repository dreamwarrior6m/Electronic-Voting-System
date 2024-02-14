import { usePathname } from "next/navigation";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";

const DashboardNavbar = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="text-white flex justify-between items-center">
        <div>{pathname.split("/").pop()}</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center p-2 bg-blue-200/15 rounded-md">
            <MdSearch className="mx-3"/>
            <input type="text" className="bg-transparent border-none" placeholder="Search..." />
          </div>
          <div className="flex gap-4">
            <MdOutlineChat size={22}/>
            <MdNotifications size={22}/>
            <MdPublic size={22}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;
