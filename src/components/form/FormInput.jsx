import React from "react";

function FormInput({register,name}) {
  return (
    <input
      placeholder={name}
      type="text"
      {...register(name)}
      className="border w-full border-gray-400 rounded-md p-1 px-4"
    />
  );
}

export default FormInput;
