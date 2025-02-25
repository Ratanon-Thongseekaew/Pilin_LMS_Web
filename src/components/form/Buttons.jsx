import React from 'react'
import { Loader } from 'lucide-react';

function Buttons({isSubmitting, label}) {
  return (
    <button className="bg-sky-500 text-white px-2 py-1 rounded-md hover:cursor-pointer hover:bg-sky-600">
    {
    isSubmitting 
    ? <div className='flex gap-2'><Loader className='animate-spin'/>
    <p>loading...</p>
    </div> 
    : <p>{label}</p>
    }
  </button>
  )
}

export default Buttons