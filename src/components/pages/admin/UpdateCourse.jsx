import React, { useEffect, useState } from 'react'
import useAuthStore from '../../../store/auth-store'
import { actionGetCourseById, actionUpdateCourse } from '../../../api/course'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import createAlert from '../../../utils/createAlert'
import FormInput from '../../form/FormInput'
import Buttons from '../../form/Buttons'
import Swal from 'sweetalert2'
function UpdateCourse() {
  const {formState,reset,register,handleSubmit,setValue} = useForm()
  const {errors} = formState
  const {id} = useParams()
  const token = useAuthStore((state=>state.token))
  console.log("Show token on update Course:",token)
  const [loading,setLoading] = useState(true)
// show data by id 
useEffect(()=>{
const getCourseData = async ()=>{
try {
  const res = await actionGetCourseById(id,token);
  const courseData = res.data.getCourse
  console.log("Fetched course Check: ", courseData)

  //เอา field ที่มีอยู่มาโชว์
  Object.keys(courseData).forEach((key)=>{
    console.log(key)
  if(key == "category"){
    console.log(key+ "Id",courseData[key].id)
    setValue(key+ "Id",courseData[key].id)

  } else {
  setValue(key,courseData[key])
  }
  });
setLoading(false)
} catch (error) {
  console.error("Error fetching course:", error);
  createAlert("error", "Failed to fetch course data");
  setLoading(false);
}
}
getCourseData()
},[id,setValue,token])

const hdlSubmitUpdateCourse = async(courseData)=>{
  try {
    const result = await Swal.fire({
      icon: "info",
      title: "Confirm",
      text: "Update this Course?",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
    });

    if (result.isConfirmed) {
      courseData.categoryId = Number(courseData.categoryId);
      courseData.price = Number(courseData.price);

      await actionUpdateCourse(token, id, courseData);
      createAlert("success", "Course Updated Successfully");
    }
  } catch (error) {
    console.error("Error updating course:", error);
    createAlert("error", error.response?.data?.message || "Failed to update course");
  }
}
return (
  <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Update Course</h1>

    <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-3/4 lg:w-1/2">
      {loading ? (
        <p className="text-center text-gray-600">Loading course data...</p>
      ) : (
        <form onSubmit={handleSubmit(hdlSubmitUpdateCourse)} className="space-y-4">
          <p className="text-lg font-semibold text-gray-700">Edit Course Details</p>

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
          {/* <div className="flex flex-col">
            <label className="font-medium text-gray-700">Course ID:</label>
            <FormInput register={register} name="id" type="text" errors={errors} />
          </div> */}

          {/* Video URL */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Video URL:</label>
            <FormInput register={register} name="videoURL" type="text" errors={errors} />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <Buttons label="Update Course" type="submit" />
          </div>
        </form>
      )}
    </div>
  </div>
);
}
export default UpdateCourse