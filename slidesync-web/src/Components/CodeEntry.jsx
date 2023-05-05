import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// const home = false;

export default function CodeEntry() {

    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-col items-center justify-start gap-8 pt-12">
                <p className={`text-2xl text-center max-w-xs text-[var(--text)]`}>Enter code from SlideSync Desktop Client</p>
                <form className='flex justify-center max-w-xs gap-1' onSubmit={(e) => {
                    e.preventDefault();
                    navigate('/home')
                }}>
                    <input type="text" required autoFocus placeholder='JkG78qr_092' className={`bg-[var(--secondary)] text-[var(--text)] focus:outline-none placeholder:px-1 px-5 py-2 text-xl rounded-l-2xl w-[70vw]`} style={{ fontFamily: 'Fira Code' }} />
                    <button type="submit" className={`text-xl bg-[var(--primary)] px-4 rounded-r-2xl flex items-center justify-center`}>
                        <span className="material-symbols-outlined text-white">
                            east
                        </span>
                    </button>
                </form>
                <p className={`text-sm text-center text-[var(--text)]`}>*Not sure about it? Visit help center</p>

            </div>
        </>
    )
}
