import React, { useState } from "react";
import { useForm } from "react-hook-form";
import createAlert from "../../../utils/createAlert";
import FormInput from "../../form/FormInput";
import Register from "../auth/Register";
import Buttons from "../../form/Buttons";
import Swal from "sweetalert2";
import { actionCreateNewCourse } from "../../../api/course";
import useAuthStore from "../../../store/auth-store";
function AddNewCourse() {
  const { formState, reset, register,handleSubmit } = useForm();
  const {errors} = formState
  const [thumbnail,setThumbnail] =useState(null);
  
  const token = useAuthStore((state)=>state.token)
  const hdlSubmitCreateNewCourse = async(courseData)=>{
    try {
      const result = await Swal.fire({
        icon: "info",
        title: "Confirm",
        text: "Add New Course?",
        showCancelButton: true,
        showConfirmButton: true,
      })
      if (result.isConfirmed) {
        courseData.categoryId = Number(courseData.categoryId)
        courseData.price = Number(courseData.price)
        const formData = new FormData();
        formData.append("title", courseData.title);
        formData.append("categoryId", courseData.categoryId);
        formData.append("description", courseData.description);
        formData.append("price", courseData.price);
        formData.append("instructor", courseData.instructor);
        formData.append("length", courseData.length);
        formData.append("id", courseData.id);
        formData.append("videoURL", courseData.videoURL);

        // Append the thumbnail file if selected
        if (thumbnail) {
          formData.append("thumbnails", thumbnail);
        }

          const response = await actionCreateNewCourse(token, formData);
          console.log("Course created:", response.data);
          createAlert("success", "Create A Course Successfully");
          reset(); 
        }
        console.log("Successfully Add new course eiei")
      } catch (error) {
        console.error("Error creating course:", error);
        createAlert("error", error.response?.data?.message || "Failed to create course");
      }
    }
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Course</h1>

    <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-3/4 lg:w-1/2">
      <form onSubmit={handleSubmit(hdlSubmitCreateNewCourse)} className="space-y-4">
        <p className="text-lg font-semibold text-gray-700">Enter Course Details</p>

        {/* Course Title */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Course Title:</label>
          <FormInput register={register} name="title" type="text" errors={errors} />
        </div>

        {/* Category ID */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Category ID:</label>
          <FormInput register={register} name="categoryId" type="text" errors={errors} />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Description:</label>
          <FormInput register={register} name="description" type="text" errors={errors} />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Price:</label>
          <FormInput register={register} name="price" type="text" errors={errors} />
        </div>

        {/* Instructor */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Instructor:</label>
          <FormInput register={register} name="instructor" type="text" errors={errors} />
        </div>

        {/* Length */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Course Length:</label>
          <FormInput register={register} name="length" type="text" errors={errors} />
        </div>

        {/* Course ID */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Course ID:</label>
          <FormInput register={register} name="id" type="text" errors={errors} />
        </div>

        {/* Video URL */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Video URL:</label>
          <FormInput register={register} name="videoURL" type="text" errors={errors} />
        </div>
           {/* Thumbnail Upload */}
           <div className="flex flex-col">
            <label className="font-medium text-gray-700">Add Thumbnail:</label>
            <input
  type="file"
  accept="image/*"
  onChange={(e) => setThumbnail(e.target.files[0])} // Store file in state
  className="form-control"
/>
          </div>
        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <Buttons label="Add New Course" type="submit" />
        </div>
      </form>
    </div>
  </div>
);

}

export default AddNewCourse;
