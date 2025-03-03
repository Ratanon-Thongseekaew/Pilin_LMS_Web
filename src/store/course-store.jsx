import { create } from "zustand"

const useCourseStore = create((set)=>({
courses: [],
setCourses: (value) =>{
    console.log("CourseStore Zustand:", value)
    set({courses: value})
}
}))

export default useCourseStore;