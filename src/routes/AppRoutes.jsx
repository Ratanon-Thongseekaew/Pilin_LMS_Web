import React from 'react'
import { Route, Routes } from 'react-router'

function AppRoutes() {
  return (
   <>
   <Routes>
    {/* Public User */}
    <Route path="/" element={<h1>HOME</h1>}/>
  <Route path='about' element={<h1>About</h1>}/>
  <Route path='register' element={<h1>Register</h1>}/>

  {/* Admin User */}
  <Route path='dashboard' element={<h1>Dashboard</h1>}/>
  <Route path='manage' element={<h1>Manage</h1>}/>

   </Routes>
   </>
  )
}

export default AppRoutes