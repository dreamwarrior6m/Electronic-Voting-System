import Footer from "@/Component/Footer/Footer";
import Navbar from "@/Component/Navbar/Navbar";

export const metadata = {
  title: "DVS",
  description: "Digital Voting System",
};

const Layout = ({ children }) => {
  return (
    <div>
      <div className="bg-gray-900">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
