import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { Context } from '../App';

export default function Welcome() {
    const { dark } = useContext(Context);
    return (
        <>
            <div className="flex flex-col items-center justify-end gap-24 h-full">
                <div className='flex flex-col items-center justify-end gap-3 mb-8 h-[60%]'>
                    <img src={logo} className='w-[84px] h-[76px]' alt="logo" />
                    <p className={`sora text-3xl font-extrabold text-[var(--text)]`}>SlideSync</p>
                </div>

                <div className='flex flex-col items-center h-[40%] justify-between'>
                    <div className="buttons flex flex-col gap-3">
                        <Link to={'/codeentry'}>
                            <button className={`py-4 px-12 font-semibold rounded-full border border-[var(--primary)] text-sm text-[var(--primary)]`}>ENTER CODE MANUALLY</button>
                        </Link>
                        <button className={`py-4 px-12 font-semibold rounded-full bg-[var(--primary)] text-white text-sm`}>SCAN CODE</button>
                    </div>

                    <p className={`text-[var(--text)]`}>Version 1.0.1</p>
                </div>
            </div>
        </>
    )
}
