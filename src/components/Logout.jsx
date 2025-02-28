import React from 'react'
import useAuthStore from '../store/auth-store'
import { useNavigate } from 'react-router'
import createAlert from '../utils/createAlert'
function Logout() {
    const actionLogoutWithZustand = useAuthStore((state)=>state.actionLogoutWithZustand)
    const navigate =useNavigate();
    const hdlLogout =()=>{
        // console.log("Hello Logout")
        // createAlert("success", "Logout Success")
        createAlert("success", "Logout Success")
        actionLogoutWithZustand();
        navigate("/")
    }
  return (
    <div className='bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out'>
    <button onClick={hdlLogout}>
        Logout
        </button>
    </div>
  )
}

export default Logout