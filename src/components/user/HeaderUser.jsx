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
console.log("Check User Data:",payloadWithZustand)
  return (
    <div className="bg-sky-400 h-12 flex items-center justify-end px-4">
      <nav className=" text-white  w-full flex text-center justify-between font-semibold px-8 py-2">
        <div className="flex gap-4">
          <Link to="/user">Pilin</Link>
          <p>Category</p>
        </div>
        <div className="flex w-1/3 bg-green-600">
          <p>SearchBar</p>
        </div>
        <div className="flex  w-4/5 justify-around">
          <p>Courses</p>
          <Link to="/about">About Us</Link>
          <p>Contact</p>
        <ShoppingCart className = "hover:cursor-pointer" onClick={hdlNavigateToCart }/>
        </div>
        <div className="bg-gray-300 w-1/6">
         Hello {payloadWithZustand.firstname}
        </div>
      </nav>
      <Logout />
    </div>
  );
}

export default HeaderUser;
