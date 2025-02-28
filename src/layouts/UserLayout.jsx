import React from 'react'
import { Outlet } from 'react-router'
import HeaderUser from '../components/user/HeaderUser'
import SideBarUser from '../components/user/SideBarUser'
function UserLayout() {
  return (
   <div>
 <div className="flex h-screen">
      <div className="flex flex-col flex-1">
      <HeaderUser />
      <div className="border p-2 m-2 flex-1">
      <Outlet />
      </div>
      </div>
    </div>
   </div>
  )
}

export default UserLayout