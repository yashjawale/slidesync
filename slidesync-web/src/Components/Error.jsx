import React from 'react'
import img404 from '../assets/img404.png'

export default function Error() {
  return (
    <div className='flex flex-col justify-between py-8 max-w-sm mx-auto'>
      <h1 className="text-center text-3xl text-[var(--text)]">Error Page</h1>
      <img src={img404} alt="" className=" w-48"/>
    </div>
  )
}
