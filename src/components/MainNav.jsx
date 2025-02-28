import React from 'react'
import { Link, Links } from 'react-router'

function MainNav() {
  return (
    <>
    <nav className='bg-sky-500 text-white flex text-center justify-between font-semibold px-8 py-2'>
    <div className='flex gap-4'>
    <Link to="/">Home</Link>
    <p>Category</p>
    </div>
    <div className='flex w-1/3 bg-red-600'>
    <p>SearchBar</p>
    </div>
    <div className='flex  w-4/5 justify-around'>
    <p>Courses</p>
    <p>Teach With Pilin</p>
    <Link to="/about">About Us</Link>
    <p>Contact</p>
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