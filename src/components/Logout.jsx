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
    <div className='text-white'>
    <button onClick={hdlLogout}>
        Logout
        </button>
    </div>
  )
}

export default Logout