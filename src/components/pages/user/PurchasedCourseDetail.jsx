import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import useAuthStore from '../../../store/auth-store'
import { actionGetPurchasedCourseById } from '../../../api/course'
import { ArrowLeft, Clock, User } from 'lucide-react'

function PurchasedCourseDetail() {
  const navigate = useNavigate()
  const {id} = useParams()
  console.log("ID from useParams:", id);
  const [courseDetail,setCourseDetail] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useAuthStore((state)=>state.token)
  const courseId = id;
  const hdlGoBacktoCourses = ()=>{
    navigate("/user/learning")
  }
  
  useEffect(()=>{
    const fetchPurchasedCourseDetail = async()=>{
      setLoading(true);
      if (!courseId) {
        setError("Course ID is missing");
        setLoading(false);
        return;
      }
      try {
        if (!token) {
          throw new Error("Authentication token not found");
        }
        console.log("Making API request with ID:", courseId);
        const res = await actionGetPurchasedCourseById(courseId,token)
        console.log("API response:", res);
        if (res.error) {
          throw new Error(res.error);
        }
        
        if (res.data && res.data.result) {
          setCourseDetail(res.data.result);
        } else {
          throw new Error("Course data not found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching purchased course details:", error);
        setError(error.message || "Failed to fetch course details");
        setLoading(false);
      }
    }
    fetchPurchasedCourseDetail();
  },[courseId, token])
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600">Loading course content...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={hdlGoBacktoCourses}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Back to My Courses
        </button>
      </div>
    );
  }
  if (!courseDetail) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Course not found or not purchased.</p>
        <button 
          onClick={hdlGoBacktoCourses}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Back to My Courses
        </button>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
    <div className="p-6 space-y-6">
      {/* Course Header */}
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{courseDetail.title}</h1>
        <button
          onClick={hdlGoBacktoCourses}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-full transition"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Video Player */}
      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
        {courseDetail.videoURL ? (
          <iframe
            src={courseDetail.videoURL}
            title={courseDetail.title}
            className="w-full h-full"
            allowFullScreen
            frameBorder="0"
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <p className="text-white">No video content available</p>
          </div>
        )}
      </div>

      {/* Course Info */}
      <div className="flex flex-wrap gap-6 text-gray-600">
        <div className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          <span>Instructor: <span className="font-semibold">{courseDetail.instructor || "N/A"}</span></span>
        </div>
        {courseDetail.length && (
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span>Duration: <span className="font-semibold">{courseDetail.length}</span></span>
          </div>
        )}
        {courseDetail.category && (
          <div className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm">
            {courseDetail.category.name}
          </div>
        )}
      </div>

      {/* Course Description */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h3 className="text-xl font-semibold mb-3">Course Description</h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{courseDetail.description}</p>
      </div>

      {/* Navigation */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={hdlGoBacktoCourses}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all flex items-center justify-center font-medium"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to My Courses
        </button>
      </div>
    </div>
  </div>
  )
}

export default PurchasedCourseDetail