import React from 'react'
import SideBarUser from '../components/user/SideBarUser'
import { Outlet } from 'react-router'

function UserDashBoardLayout() {
  return (
    <div className="flex">
    <SideBarUser/>
    <div className="flex-1 p-6">
        <Outlet/>
    </div>
    </div>
  )
}

export default UserDashBoardLayout