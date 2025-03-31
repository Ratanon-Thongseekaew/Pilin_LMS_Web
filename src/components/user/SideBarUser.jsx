import React from 'react'
import { userSidebarLink } from '../../utils/userLink'
import { Link } from 'react-router';

function SideBarUser() {
  return (
    <div className="bg-gray-200 w-48 text-black">
    {/* Navlink */}
    {userSidebarLink.map((item)=>{
      return(
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
  )
}

export default SideBarUser