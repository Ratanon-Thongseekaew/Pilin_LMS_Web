import React, { useState,useEffect } from 'react'
import useAuthStore from '../../../store/auth-store'
import { actionGetEveryUsers } from '../../../api/course'
import Buttons from '../../form/Buttons'
import { NotebookPen, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router'


//user management
function Manage() {
  const navigate = useNavigate()
  const hdlNavigatetoOrders =async()=>{
    navigate("order")
  }
  const [users,setUsers] = useState([])
  console.log("check User:",users)
  const token = useAuthStore((state)=>state.token)
  const hdlGetEveryUsers = async()=>{
    try {
      const res = await actionGetEveryUsers(token)
      setUsers(res.data.result)
    } catch (error) {
      console.log(error)

    }
  }
  useEffect(()=>{
    hdlGetEveryUsers(token)
  },[token])
  return (
    <div>
    <h1 className="text-3xl font-bold">User Management</h1>
    <div className="flex justify-end">
    <input placeholder="search bar"/>
    <Buttons onClick={hdlNavigatetoOrders} label ="Order Management"/>
    </div>
    <table className="w-full border border-gray-300 rounded-lg shadow-lg">
    <thead className="bg-gray-200">

  <tr>
    <th className="border border-gray-300 px-4 py-2">No.</th>
    <th className="border border-gray-300 px-4 py-2">User ID</th>
    <th className="border border-gray-300 px-4 py-2">Email</th>
    <th className="border border-gray-300 px-4 py-2">Firstname</th>
    <th className="border border-gray-300 px-4 py-2">Lastname</th>
    <th className="border border-gray-300 px-4 py-2">Role</th>
    <th className="border border-gray-300 px-4 py-2">Actions(Not Ready)</th>
  </tr>
</thead>
<tbody>
{users.map((item, index) => (
  <tr key={index} className="hover:bg-gray-100">
    <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
    <td className="border border-gray-300 px-4 py-2">{item.id}</td>
    <td className="border border-gray-300 px-4 py-2">{item.email}</td>
    <td className="border border-gray-300 px-4 py-2">{item.firstname}</td>
    <td className="border border-gray-300 px-4 py-2">{item.lastname}</td>
    <td className="border border-gray-300 px-4 py-2">{item.role}</td>
    <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
      <NotebookPen className="cursor-pointer text-blue-500 hover:text-blue-700"  />
      <Trash2
        className="cursor-pointer text-red-500 hover:text-red-700"
        
      />
    </td>
  </tr>
))}
</tbody>
</table>
</div>
  )
}

export default Manage