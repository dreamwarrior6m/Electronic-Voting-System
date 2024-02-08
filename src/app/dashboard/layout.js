"use client";
import NavBarIcon from "@/Component/Dashboard/NavBarIcon/NavBarIcon";
import SideNav from "@/Component/Dashboard/SideNav/SideNav";

const layout = ({ children }) => {
  return (
    <div className="px-4 py-2 lg:flex lg:px-0 lg:py-0">
      {/* SideNav  */}
      <div>
        <div className="hidden lg:block p-6 w-1/2 lg:w-72 lg:h-screen bg-white">
          <SideNav />
        </div>
        <div className="lg:hidden">
          <NavBarIcon />
        </div>
      </div>
      {/* content  */}
      <div className="flex-1 p-8 ">
              {children}
        
        </div>
    </div>
  );
};

export default layout;
