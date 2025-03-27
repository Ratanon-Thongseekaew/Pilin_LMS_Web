import React, { useEffect, useState } from "react";
import useAuthStore from "../../../store/auth-store";
import { actionUserGetEveryCourse } from "../../../api/user";
import { useNavigate } from "react-router";
import useCourseStore from "../../../store/course-store";

function UserCourse() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const { courses, setCourses } = useCourseStore();
  console.log("010325 Test",courses)
  const hdlNavigateToCart = ()=>{
    navigate("/user/cart")
  }
  const hdlNagivateCourseDetail = async (id) => {
    navigate(`course/${id}`);
  };
  const hdlUserGetEveryCourses = async (token) => {
    try {
      const res = await actionUserGetEveryCourse(token);
      console.log("this is res result eiei", res.data.courses);
      setCourses(res.data.courses);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Only fetch courses if they're not already in state or if empty
    if (!courses || courses.length === 0) {
      hdlUserGetEveryCourses(token);
    }
  }, [token, courses, setCourses]);
  console.log("check course state:", courses);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses?.map((item, index) => (
          <div
            key={index}
            onClick={() => hdlNagivateCourseDetail(item.id)}
            className="bg-gray-100 hover:cursor-pointer shadow-lg rounded-2xl p-4 border border-gray-200 flex flex-col h-full"
          >
            {/* Course Thumbnail */}
            {item.thumbnails && (
              <img
                src={item.thumbnails}
                alt={item.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
            )}
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600">Instructor: {item.instructor}</p>
              <p className="text-green-600 font-bold">Price: ฿{item.price}</p>
              <span className="text-sm text-blue-500 font-medium">
                {item.category.name}
              </span>
            </div>
            <button onClick={hdlNavigateToCart} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserCourse;
