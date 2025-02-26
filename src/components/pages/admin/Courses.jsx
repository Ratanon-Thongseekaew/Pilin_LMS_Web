import React, { useEffect, useState } from "react";
import useAuthStore from "../../../store/auth-store";
import { actionDeleteCourse, actionGetEveryCourses } from "../../../api/course";
import { NotebookPen, Trash, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import createAlert from "../../../utils/createAlert";
import Buttons from "../../form/Buttons";
import { useNavigate } from "react-router";
//Course
function Courses() {
    const navigate = useNavigate();
    const [courses,setCourses] = useState([])
    const token = useAuthStore((state)=>state.token)
const hldactionGetEveryCourses = async(token)=>{
    try{
        const res = await actionGetEveryCourses(token)
        setCourses(res)
        console.log("Check course",courses)
    }catch(error){
        console.log(error)
    }
}
const hdlAddnewCourse =async()=>{
    navigate("newcourse")
}
const hdlDeleteCourse = async(token,id)=>{
    Swal.fire({
        icon: "info",
        text: "Are You Sure",
        showCancelButton: true,
        showConfirmButton: true,
    }).then(async(data)=>{
        console.log(data.isConfirmed)
        if(data.isConfirmed){
            const res =await actionDeleteCourse(token,id);
            console.log(res)
            createAlert("success", "delete successfully")
        }
    })
    console.log(token,id)
}

useEffect(()=>{
    hldactionGetEveryCourses(token)
},[token])
  return (
    <div>
        <h1 className="text-3xl font-bold">Course Management</h1>
        <div className="flex justify-end">
        <input placeholder="search bar"/>
        <Buttons label ="Add New Course" onClick={hdlAddnewCourse}/>
        </div>
        <table className="w-full border border-gray-300 rounded-lg shadow-lg">
  <thead className="bg-gray-200">
    <tr>
      <th className="border border-gray-300 px-4 py-2">No.</th>
      <th className="border border-gray-300 px-4 py-2">Course Id.</th>
      <th className="border border-gray-300 px-4 py-2">Category</th>
      <th className="border border-gray-300 px-4 py-2">Name</th>
      <th className="border border-gray-300 px-4 py-2">Price</th>
      <th className="border border-gray-300 px-4 py-2">Instructor</th>
      <th className="border border-gray-300 px-4 py-2">CreatedAt</th>
      <th className="border border-gray-300 px-4 py-2">UpdatedAt</th>
      <th className="border border-gray-300 px-4 py-2">Action</th>
    </tr>
  </thead>
  <tbody>
    {courses.map((item, index) => (
      <tr key={index} className="hover:bg-gray-100">
        <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
        <td className="border border-gray-300 px-4 py-2">{item.id}</td>
        <td className="border border-gray-300 px-4 py-2">{item.category.name}</td>
        <td className="border border-gray-300 px-4 py-2">{item.title}</td>
        <td className="border border-gray-300 px-4 py-2">฿{item.price}</td>
        <td className="border border-gray-300 px-4 py-2">{item.instructor}</td>
        <td className="border border-gray-300 px-4 py-2">{item.createdAt}</td>
        <td className="border border-gray-300 px-4 py-2">{item.updatedAt}</td>
        <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
          <NotebookPen className="cursor-pointer text-blue-500 hover:text-blue-700" />
          <Trash2
            className="cursor-pointer text-red-500 hover:text-red-700"
            onClick={() => hdlDeleteCourse(token, item.id)}
          />
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}

export default Courses;
// useEffect(()=>{
//     hldactionGetAllCoursebyCategory(token)
// },[])


// const hldactionGetAllCoursebyCategory =async(token)=>{
//     try {
//     const res = await actionGetAllCoursebyCategory(token,"Marketing")
//     console.log(res)
//     } catch (error) {
//         console.log(error)
//     }