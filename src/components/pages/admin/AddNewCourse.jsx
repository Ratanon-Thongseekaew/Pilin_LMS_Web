import React from "react";
import { useForm } from "react-hook-form";
import createAlert from "../../../utils/createAlert";
import FormInput from "../../form/FormInput";
import Register from "../auth/Register";
import Buttons from "../../form/Buttons";
function AddNewCourse() {
  const { formState, reset, register,handleSubmit } = useForm();
  const { errors } = formState;

    const onSubmit = ()=>{
        console.log("save")
    }

  return (
    <div className="flex flex-col w-full h-full bg-gray-500">
      <h1 className="text-3xl font-bold">Add New Course</h1>
      <div className="flex w-full h-full bg-red-500 border-black ">
    {/* Form */}
    <form>
        <div>
            <h1>Add Course Title</h1>
            <FormInput register = {Register}name ="title" errors={errors}/>
            <Buttons label="Add New Course"/>
        </div>
    </form>
      </div>
    </div>
  );
}

export default AddNewCourse;
