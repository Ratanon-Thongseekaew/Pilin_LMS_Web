import React from 'react'
import { Link, Links } from 'react-router'

function MainNav() {
  return (
    <>
    <nav className='bg-red-500 text-black flex text-center justify-between font-semibold px-8 py-2'>
    <div className='flex gap-4'>
    <Link to="/">Home</Link>
    <p>Category</p>
    </div>
    <p>Search</p>
    <p>Courses</p>
    <p>Teach With Pilin</p>
    <Link to="/about">About Us</Link>
    <p>Contact</p>
    <Link to="/register">Register</Link>
    <Link to="/login">Login</Link>

    </nav>
    </>
  )
}

export default MainNav