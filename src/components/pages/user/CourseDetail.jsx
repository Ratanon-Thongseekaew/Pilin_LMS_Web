import React, { useEffect } from 'react'
import {  useParams } from 'react-router'
import { actionGetCourseById } from '../../../api/course'
import useCourseStore from '../../../store/course-store'
import useAuthStore from '../../../store/auth-store'

function CourseDetail() {
const {id} = useParams()
const {courses,setCourses} = useCourseStore(state=>state)
const token = useAuthStore((state) =>state.token);
useEffect(()=>{
const showCourseDetail = async()=>{
try {
  const res = await actionGetCourseById(id,token)
  console.log("API Response:", res.data);
  setCourses(res.data.getCourse)
} catch (error) {
 
  console.error("Error fetching course details:", error);

}
}
showCourseDetail()
},[id,token,setCourses])
console.log(courses)

if (!courses) return <p>Loading course details...</p>;
console.log("Selected Course Info:",courses)
  return (
    <div  className="p-6">
      <h2 className="text-2xl font-bold">{courses.title}</h2>
          {courses.thumbnails && (
        <img
          src={courses.thumbnails}
          alt={`Thumbnail for ${courses.title}`}
          className="w-full h-auto mt-4"
        />
      )}
            <p className="text-gray-600">Instructor: {courses.instructor}</p>
            <p className="text-green-600 font-bold">Price: ${courses.price}</p>
            <p className="text-gray-700">{courses.description}</p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                Add to Cart
            </button>
    </div>
  )
}

export default CourseDetail
