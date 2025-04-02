import React, { useEffect, useState } from "react";
import useAuthStore from "../../../store/auth-store";
import { actionGetPurchasedCourses } from "../../../api/course";
import { useNavigate } from "react-router";

function PurchasedCourses() {
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    console.log("eieiza purchasedCourses",purchasedCourses)
    console.log("purchasedCourses check",purchasedCourses)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useAuthStore((state) => state.token);
    const navigate = useNavigate()
    const hdlNavigatetoPurchasedCourseDetail = (id)=>{
      navigate(`/user/learning/${id}`)
    }
    useEffect(() => {
      const fetchPurchasedCourses = async () => {
        setLoading(true); // Make sure loading is true when starting the fetch
        try {
          if (!token) {
            throw new Error("Authentication token not found");
          }
          const res = await actionGetPurchasedCourses(token);
          if (res.error) {
            throw new Error(res.error);
          }
          console.log("API response:", res.data.result);
          setPurchasedCourses(res.data.result);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching courses:", error);
          setError(error.message || "Failed to fetch courses");
          setLoading(false);
        }
      };
      fetchPurchasedCourses();
    }, [token]);
  
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Purchased Courses</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading your courses...</p>
            </div>
          ) : error ? (
            <div className="text-red-500 py-4">
              <p>Error: {error}</p>
            </div>
          ) : purchasedCourses.length === 0 ? (
            <div className="text-gray-500 py-4 text-center">
              <p>You haven't purchased any courses yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {purchasedCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-gray-100 hover:cursor-pointer shadow-lg rounded-2xl p-4 border border-gray-200 flex flex-col h-full"
                >
                  {/* Course Thumbnail */}
                  {course.thumbnails ? (
                    <img
                      src={course.thumbnails}
                      alt={course.title}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                  
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <p className="text-gray-600">
                      Instructor: {course.instructor || "N/A"}
                    </p>
                    <p className="text-green-600 font-bold">
                      Price: ฿{Number(course.price).toFixed(2)}
                    </p>
                    <span className="text-sm text-blue-500 font-medium">
                      {course.category?.name || "Uncategorized"}
                    </span>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-xs">
                      Purchased
                    </span>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition" onClick={() => hdlNavigatetoPurchasedCourseDetail(course.id)}>
                      View Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
      );
  }
export default PurchasedCourses;
