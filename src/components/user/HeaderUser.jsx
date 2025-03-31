import React from "react";
import Logout from "../Logout";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../../store/auth-store";
import { ShoppingCart } from "lucide-react";

function HeaderUser() {
  const payloadWithZustand = useAuthStore((state)=>state.user)
  const navigate = useNavigate()
  const hdlNavigateToCart = ()=>{
    navigate("/user/cart")
  }
  const hdlNavigateUserInfo = ()=>{
    navigate("info")
  }
console.log("Check User Data:",payloadWithZustand)
  return (
    <div className="bg-sky-400 h-12 flex items-center justify-end px-4">
      <nav className=" text-white  w-full flex text-center justify-between font-semibold px-8 py-2">
        <div className="flex gap-4">
          <Link to="/user">Pilin</Link>
          <Link to="/user">Courses</Link>
        </div>
       
        <div className="flex  w-4/5 justify-end gap-6 pr-6">
          <Link to="/about">About Us</Link>
        <ShoppingCart className = "hover:cursor-pointer" onClick={hdlNavigateToCart }/>
        </div>
        <button className="bg-gray-300 w-24 rounded-full" onClick={hdlNavigateUserInfo}>
         Hello {payloadWithZustand.firstname}
        </button>
      </nav>
      <Logout />
    </div>
  );
}

export default HeaderUser;
