import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../App';
import { AppContext } from './Home';

const days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat','Sun']
const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export default function Time() {

    const {dark} = useContext(Context)
    const {showexit , showmenu} = useContext(AppContext)
    const [date, setDate] = useState(new Date());
    
    useEffect(() => {
        setInterval(() => {
            setDate(new Date())
        }, 1000)
    },[])
    return (
        <>
            <div className={`bg-[var(--secondary)] mx-8 py-6 rounded-[30px] flex items-center justify-center gap-8 ${showexit && 'opacity-10'}`}>
                <div className="time">
                    <p className='text-6xl sora text-[var(--text)]'>{date.getHours()<10 ? "0" + date.getHours() : date.getHours() }:{date.getMinutes()<10 ? "0" + date.getMinutes() : date.getMinutes()}</p>
                </div>
                <div className="date">
                    <div className="flex flex-col items-center justify-center">
                        <p className='text-[var(--text)] sora text-sm'>{days[date.getDay()]}</p>
                        <p className={`sora text-3xl text-[var(--primary)]`}>{date.getDate()<10 ? "0"+ date.getDate() : date.getDate() }</p> 
                        <p className='text-[var(--text)] sora text-sm'>{months[date.getMonth()]}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
