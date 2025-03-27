import React from 'react'
import { Link } from 'react-router'

function MainNav() {
  return (
    <>
    <nav className='bg-sky-500 text-white flex text-center justify-between font-semibold px-8 py-2'>
    <div className='flex gap-4'>
    <Link to="/">Home</Link>
    </div>
    <div className='flex  w-4/5 justify-around'>
    </div>
    <div className='flex gap-6'>
    <Link to="/register">Register</Link>
    <Link to="/login">Login</Link>
    </div>
    </nav>
    </>
  )
}

export default MainNav