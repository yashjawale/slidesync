import React from 'react'
import { useNavigate } from 'react-router-dom'
import img404 from '../assets/404.svg'
import logo from "../assets/logo.svg"
export default function PageNotFound() {

  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-start gap-20 items-center py-8 max-w-sm mx-auto h-screen'>

      <div className="logo flex items-center gap-2">
        <img src={logo} className='w-[32.9px] h-[30px]' alt="logo" />
        <p className={`font-semibold sora text-2xl text-[var(--text)]`}>SlideSync</p>
      </div>

      <div className='flex flex-col justify-evenly gap-20 items-center h-[60vh]'>
        <div className='flex flex-col items-center gap-8'>
          <img src={img404} alt="" className=" w-48" />
          <p className='text-[var(--text)] text-xl text-center max-w-[70%]' style={{ fontFamily: 'Fira Code' }}>Oops!!Looks like you took a wrong turn</p>
        </div>
        <button className={`py-4 px-12 font-semibold rounded-full bg-[var(--primary)] text-sm text-white`}
          onClick={() => { navigate('/') }}>BACK TO HOME</button>
      </div>

    </div>
  )
}
