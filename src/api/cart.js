import axios from "axios"
import useAuthStore from "../store/auth-store"

export const actionAddtoCart = async(token,courseId) =>{

try {
    const result = await axios.post(`http://localhost:8989/cart`,
    {
        courseId: Number(courseId)},
    {
        headers:{
        Authorization: `Bearer ${token}`,
        }
    }
)
    return result
    
} catch (error) {
    console.error("Error in actionAddtoCart function:", error)
    throw error
}
}


export const actionGetCartItem = async(token) =>{
    const result = await axios.get(`http://localhost:8989/cart`,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log("get Cart Result:",result)
      return result
}


export const actionDeleteCartItem = async(token,courseId)=>{
    const result = await axios.delete(`http://localhost:8989/cart`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
        data: {courseId},
    })
    console.log("Delete Cart Item:", result)
    return result
}
export const actionClearCart = async(token) =>{
    const result = await axios.delete(`http://localhost:8989/cart`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    })
    return result
}