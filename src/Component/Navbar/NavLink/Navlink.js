import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavLink = ({ href, icon, title }) => {
  const pathName = usePathname();

  return (
    <Link href={href}>
      <div className={`flex items-center text-white hover:text-gray-300 transition duration-300 relative relative-group`}>
        <span className="mr-1">{icon}</span>
        {title}
        {pathName === href && (
          <>
            <motion.div
              className="absolute bottom-0  left-0 w-full h-1 bg-gradient-to-r from-[#3182CE] via-[#93C5FD] to-[#3182CE] -mb-1"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9 }}
            />
          </>
        )}
      </div>
    </Link>
  );
};

export default NavLink;