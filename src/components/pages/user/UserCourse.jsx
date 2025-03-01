import React, { useEffect, useState } from 'react'
import useAuthStore from '../../../store/auth-store'
import { actionUserGetEveryCourse } from '../../../api/user'
import Buttons from '../../form/Buttons'

function UserCourse() {
    const token = useAuthStore((state)=>state.token)
    const [courses,setCourses] = useState([])
    console.log("010325 Test",courses)
    const hdlUserGetEveryCourses = async(token)=>{
        try {
            const res = await actionUserGetEveryCourse(token)
            console.log("this is res result eiei",res.data.courses)
            setCourses(res.data.courses)
        } catch (error) {
            console.log(error)
        }
    }
  useEffect(()=>{
    hdlUserGetEveryCourses(token)
  },[token])
  console.log("check course state:",courses)
  
  return (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {courses?.map((item, index) => (
        <div key={index} className="bg-white shadow-lg rounded-2xl p-4 border border-gray-200 flex flex-col h-full">
           {/* Course Thumbnail */}
            {item.thumbnails &&(
                <img
                src={item.thumbnails}
                alt={item.title}
                className="w-full h-40 object-cover rounded-lg mb-3"/>
            )}
            <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">Instructor: {item.instructor}</p>
                <p className="text-green-600 font-bold">Price: ${item.price}</p>
                <span className="text-sm text-blue-500 font-medium">{item.category.name}</span>
            </div>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                Add to Cart
            </button>
        </div>
    ))}
</div>
    </div>
);
}

export default UserCourse