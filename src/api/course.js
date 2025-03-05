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
    const result = await axios.delete(
       `http://localhost:8989/admin/courses/course/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
return result
}



export const actionCreateNewCourse = async(token,formData)=>{
  const result = await axios.post("http://localhost:8989/admin/courses/newcourse",formData,{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
})
return result
}

export const actionGetCourseById = async(id,token)=>{
  console.log("actiongetCOurseByID id Check:",id)
  const result =  await axios.get(`http://localhost:8989/admin/courses/course/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result
};



export const actionUpdateCourse = async(token,id,courseData)=>{
  const result = await axios.put(`http://localhost:8989/admin/courses/course/${id}`, courseData,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return result
}

export const actionGetEveryUsers = async(token)=>{
const result = await axios.get(`http://localhost:8989/admin/user/alluser`,{
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  return result


}
