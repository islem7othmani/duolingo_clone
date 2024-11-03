import React from 'react'
import heroImage from '../Images/image.png'

export default function Hero() {
  return (
    <>

<div className='flex  mx-16'>
    <div className='flex items-center'>
      <div>
      <h1 className='font-bold text-3xl pb-2'>Master Spanish with Confidence</h1>
      <p className='w-2/3 font-semibold text-lg'>Unlock fluency through personalized lessons, interactive exercises, and real-time feedback—designed for learners at every level.</p>
      <button className='border border-black text-black py-1 px-4 rounded-lg mt-2'>Get Started</button>
      </div>
    </div>
    <div>
        <img src={heroImage} alt="" />
    </div>
</div>
    </>
  )
}
