import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import FormInput from "../../form/FormInput";
import createAlert from "../../../utils/createAlert";
import Buttons from "../../form/Buttons";
import { useNavigate } from "react-router";
//validator
import { loginUser } from "../../../utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { actionLogin } from "../../../api/auth";
import useAuthStore from "../../../store/auth-store"

function Login() {
//zustand
const actionLoginWithZustand = useAuthStore((state)=>state.actionLoginWithZustand)

  const navigate = useNavigate()
  const { register, handleSubmit, formState, reset } = useForm({
    resolver:zodResolver(loginUser)
  });
  const { isSubmitting, errors } = formState;

  console.log(errors);
  const hdlSubmit = async (value) => {
    //delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await actionLoginWithZustand(value)
      if(res.success){
        roleRedirect(res.role)
        reset()
        createAlert("success",`Welcome back, ${res.firstname}`)
      }else
      createAlert("info", "Invalid Email or Password")
      console.log(res.error)
      // console.log(res.data.payload)
      // console.log(res.data.token)
      // const res = await actionLogin(value)
      // const role = res.data.payload.role
      // console.log(role);
      // createAlert("success", "Login Successfully");
    
  };
  const roleRedirect = (role)=>{
//code
if(role ==="ADMIN"){
  navigate('/admin')
}else{
  navigate('/user')
}
  }
  return (
    <div className="flex w-full h-full justify-center">
      <div className="w-64 border p-4 rounded-md text-center">
        <h1 className="text-xl font-bold text-center">Login</h1>
        {/* Form */}
        <form onSubmit={handleSubmit(hdlSubmit)}>
          <div className="flex flex-col gap-2 py-4">
            <FormInput register={register} name="email" errors ={errors} />
            <FormInput register={register} name="password" errors ={errors} type="password"/>
            <div className="flex justify-center">
             <Buttons isSubmitting={isSubmitting}
             label= "Login"
             />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
