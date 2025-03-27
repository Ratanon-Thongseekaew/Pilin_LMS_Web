import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCourseStore = create
(persist(
  (set,get) => ({
    allcourses: [],
    selectedCourse: null,
    setCourses: (courses) => set({ courses }),
    setSelectedCourse: (selectedCourse) => set({ selectedCourse }),
    resetSelectedCourse: () => set({ selectedCourse: null }),
  }),
  {
    name:"course-storage",
    getStorage:()=>localStorage
  }
)
)

export default useCourseStore;