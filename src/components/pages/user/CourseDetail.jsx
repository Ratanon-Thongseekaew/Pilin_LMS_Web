import React, { useEffect } from 'react'
import {  useParams } from 'react-router'
import { actionGetCourseById } from '../../../api/course'
import useCourseStore from '../../../store/course-store'
import useAuthStore from '../../../store/auth-store'
import { useNavigate } from 'react-router'
import { actionAddtoCart } from '../../../api/cart'
import { ShoppingCart, User } from 'lucide-react'
import createAlert from '../../../utils/createAlert'

function CourseDetail() {
const navigate = useNavigate()
const {id} = useParams()
const {selectedCourse,setSelectedCourse} = useCourseStore(state=>state)
const token = useAuthStore((state) =>state.token);
const hdlNavigateToCart = ()=>{
  navigate("/user/cart")
}

useEffect(()=>{
const showCourseDetail = async()=>{
try {
  const res = await actionGetCourseById(id,token)
  console.log("API Response:", res.data.getCourse);
  setSelectedCourse(res.data.getCourse)
} catch (error) {
  console.error("Error fetching course details:", error);
}
}
showCourseDetail()
},[id,token,setSelectedCourse])
console.log(selectedCourse)

if (!selectedCourse) return <p>Loading course details...</p>;
console.log("Selected Course Info:",selectedCourse)

const addtoCart = async()=>{
try {
  console.log("Attempting to add course with ID:", id)
  console.log("using token",token)
  const res = await actionAddtoCart(token,id)
  console.log("Successfully Add to Cart:",res.data)
  navigate("/user/cart")
} catch (error) {
  createAlert("error","You Already Added to Cart")
  console.error("Faild to Add to Cart:", error);
}
}



  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
    <div className="p-6 space-y-4">
      <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{selectedCourse.title}</h2>
      
      {selectedCourse.thumbnails && (
        <div className="relative rounded-lg overflow-hidden shadow-md">
          <img
            src={selectedCourse.thumbnails}
            alt={`Thumbnail for ${selectedCourse.title}`}
            className="w-full h-64 object-cover"
          />
        </div>
      )}
      
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-600 flex items-center">
          <User className="h-5 w-5 mr-2" />
          Instructor: <span className="font-semibold ml-1">{selectedCourse.instructor}</span>
        </p>
        
        <p className="text-green-600 text-xl font-bold">฿{selectedCourse.price}</p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-gray-700 leading-relaxed">{selectedCourse.description}</p>
      </div>
      
      <div className="mt-6">
        <button 
          onClick={addtoCart} 
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all flex items-center justify-center font-medium"
        >
          <ShoppingCart className="h-5 w-5 mr-2 " />
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  )
}

export default CourseDetail
