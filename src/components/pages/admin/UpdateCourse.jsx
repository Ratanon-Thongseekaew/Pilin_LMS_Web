import React from 'react'
import useAuthStore from '../../../store/auth-store'
import { actionUpdateCourse } from '../../../api/course'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
function UpdateCourse() {
  const {formState,reset,register,handleSubmit} = useForm()
  const {errors} = formState
  const {id} = useParams
  const token = useAuthStore((state=>state.token))
  const hldSubmitUpdateCourse = async(id)=>{
    try {
   
    } catch (error) {
      
    }
  }

  

  return (
    <div>
      <h1>Update Your Course</h1>
    </div>
  )
}

export default UpdateCourse