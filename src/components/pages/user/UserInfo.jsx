import React from 'react'
import SideBarUser from '../../user/SideBarUser'
import { Outlet } from 'react-router'
import useAuthStore from '../../../store/auth-store';
 
function UserInfo() {
  const payloadWithZustand = useAuthStore((state)=>state.user)
  console.log(payloadWithZustand)
  return (
    <div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Information</h2>
      <div className="space-y-4">
        <div className='flex flex-col gap-1'>
          <h3 className="text-lg font-semibold">Personal Details</h3>
          <div className="flex-col space-y-2">
  <div className="flex">
    <p className="w-24 font-bold">Firstname:</p>
    <p>{payloadWithZustand.firstname}</p>
  </div>
  <div className="flex">
    <p className="w-24 font-bold">Lastname:</p>
    <p>{payloadWithZustand.lastname}</p>
  </div>
  <div className="flex">
    <p className="w-24 font-bold">Your Email:</p>
    <p>{payloadWithZustand.email}</p>
  </div>
  <div className="flex">
    <p className="w-24 font-bold">Your Role:</p>
    <p>{payloadWithZustand.role.toLowerCase()}</p>
  </div>
</div>
        </div>
        {/* Add more user information sections as needed */}
      </div>
    </div>
    </div>
  );
}
export default UserInfo