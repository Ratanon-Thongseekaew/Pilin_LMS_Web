import React from "react";
import { Link } from "react-router";
import { sidebarLink } from "../../utils/link";
function SidebarAdmin() {
  return (
    <div className="bg-gray-200 w-48 text-black">
      {/* navlink */}
      {sidebarLink.map((item) => {
        return (
          <div className="flex flex-col items-center my-12 gap-2 hover:bg-sky-600 hover:duration-200 hover:text-white ">
            <Link
              className="flex items-center py-2 px-1 gap-2"
              to={item.Link} 
              >
              {item.icon}
            <p>{item.label}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default SidebarAdmin;
