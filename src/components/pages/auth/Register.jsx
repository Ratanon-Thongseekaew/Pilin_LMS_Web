import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import FormInput from "../../form/FormInput";
import createAlert from "../../../utils/createAlert";
import Buttons from "../../form/Buttons";
//validator
import { registerUser } from "../../../utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { actionRegister } from "../../../api/auth";


function Register() {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver:zodResolver(registerUser)
  });
  const { isSubmitting, errors } = formState;

  console.log(errors);
  const hdlSubmit = async (value) => {
    //delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const res = await actionRegister(value)
      console.log(res);
      reset()
      createAlert("success", "Register Successfully");
    } catch (error) {
      createAlert("info", error.response?.data?.message);
      // console.log(error.response?.data?.message);
    }
  };
  return (
    <div className="flex w-full h-full justify-center">
      <div className="w-64 border p-4 rounded-md text-center">
        <h1 className="text-xl font-bold text-center">Register</h1>
        {/* Form */}
        <form onSubmit={handleSubmit(hdlSubmit)}>
          <div className="flex flex-col gap-2 py-4">
            <FormInput register={register} name="email" errors ={errors} />
            <div className="flex gap-2 py-4">
              <FormInput register={register} name="firstname" errors ={errors}/>
              <FormInput register={register} name="lastname" errors ={errors}/>
            </div>
            <FormInput register={register} name="password" errors ={errors} type="password"/>
            <FormInput register={register} name="confirmPassword" errors ={errors} type="password"/>
            <div className="flex justify-center">
             <Buttons isSubmitting={isSubmitting}
             label= "Register"
             />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
