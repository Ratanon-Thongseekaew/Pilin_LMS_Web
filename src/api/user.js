import axios from "axios"

export const actionUserGetEveryCourse = async(token)=>{
const result = await axios.get("http://localhost:8989/user/course/allcourses",{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  console.log("This is User All Course",result)
  return result

}