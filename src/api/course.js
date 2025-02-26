import axios from "axios"

// export const actionGetAllCoursebyCategory = async(token,category)=>{
// const result = await axios.get(`http://localhost:8989/admin/courses/${category}?page=1&limit=25`,{
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//   console.log(result)
//   return result.data.courses


// }

export const actionGetEveryCourses = async(token)=>{
    const result = await axios.get(`http://localhost:8989/admin/courses/course/allcourses`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(result)
      return result.data.courses
}

export const actionDeleteCourse = async(token,id) =>{
    const result = axios.delete(
       `http://localhost:8989/admin/courses/course/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
return result
}