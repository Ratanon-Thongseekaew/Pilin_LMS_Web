import React from 'react'
import Buttons from '../form/Buttons'
import { useNavigate } from 'react-router'



function Home() {
  const navigate = useNavigate()
  
  const hdlRegister =async()=>{
    navigate("/register")
  }
  return (
    <div className='bg-blue-400 w-screen h-screen opacity-90'>
      <div className='flex flex-col bg-[url("https://res.cloudinary.com/dwdyih5ih/image/upload/v1743078504/pilin-bg_rhjfgv.jpg")] bg-cover bg-center items-center justify-center w-full h-full min-h-screen"'>
      <div className='flex flex-col items-center gap-4'>
    <h1 className='text-7xl text-white font-bold drop-shadow-lg'>Polishing Your Skills</h1>
    <h1 className='text-7xl text-white font-bold drop-shadow-lg'>for Future Careers</h1>
    <h1 className='text-4xl text-white font-bold  drop-shadow-lg'>เจียระไนทักษะของคุณเพื่อพร้อมเข้าสู่โลกของการทำงาน</h1>
    <Buttons onClick={hdlRegister} label= "Explore Our Courses"/>
      </div>
      </div>
    </div>
  )
}

export default Home