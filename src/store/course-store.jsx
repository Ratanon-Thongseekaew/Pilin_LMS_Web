import { create } from "zustand"
import { persist } from "zustand/middleware"

const useCourseStore = create((set)=>({
courses: [],
setCourses: (value) =>{
    console.log("CourseStore Zustand:", value)
    set({courses: value})
}
}))

export default useCourseStore;