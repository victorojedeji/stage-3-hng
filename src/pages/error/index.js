import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const navigate = useNavigate();
  const handleBackBtn = () => {
    navigate(-1);
  }
  return (
    <section className='text-white w-full h-[100vh] flex flex-col justify-center items-center bg-[#1d2951] '>
      <h1 className='text-xl md:text-3xl'>Oops! You seem to be lost</h1>
      <button onClick={handleBackBtn} className='px-4 py-2 rounded-full border-2 mt-6'>Go back</button>
    </section>
  )
}
