import React from 'react'

export default function Loader() {
    return (
        <>
            <div className="flex items-center justify-center gap-4 absolute top-[50%] left-auto loader-main">
                <span className='w-6 h-6 bg-[var(--primary)] rounded-full loaders-1'></span>
                <span className='w-6 h-6 bg-[var(--primary)] rounded-full '></span>
                <span className='w-6 h-6 bg-[var(--primary)] rounded-full loaders-2'></span>
            </div>
        </>
    )
}
