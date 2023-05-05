import React from 'react'

export default function List(props) {
    return (

        <li>
            <div className='flex items-center justify-between border-b-2 pb-2 border-gray-300'>
                <p className="text-xl">{props.settingName}</p>
                <button onClick={props.handleClick} tabIndex={-1}>
                    <i className={`material-icons text-6xl ${props.status ? 'text-[var(--primary)]' : 'text-gray-400'}`}>{props.status ? 'toggle_on' : 'toggle_off'}</i>
                </button>
            </div>
        </li >
    )
}




{/* <li>
    <div className='flex items-center justify-between border-b-2 pb-2 border-gray-300'>
        <p className="text-xl">Prevent the screen from sleeping</p>
        <button><i className={`material-icons text-6xl ${sleep ? 'text-[#1899E9!important]' : 'text-gray-300'}`} onClick={() => { setSleep(!sleep) }}>
            {sleep ? 'toggle_on' : 'toggle_off'}
        </i></button>
    </div>
</li> */}
