import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// import logo from '../assets/logo.svg'
import logout from '../assets/logout.png'
import logo from '../assets/logo.svg'
import { AppContext } from './Home'
import { Context } from '../App'
export default function Nav() {
    let { showmenu, setShowMenu ,setShowExit ,showexit } = useContext(AppContext);
    let { dark } = useContext(Context);

    const navigate = useNavigate();

    return (
        <>
            <nav className={`flex items-center justify-between px-3 ${showexit && 'opacity-10'}`}>
                <div className="logout" onClick={()=>{setShowExit(true)}}>
                    <img src={logout} className='w-[24px]' alt="" />

                </div>
                <div className="logo flex items-center gap-2">
                    <img src={logo} className='w-[32.9px] h-[30px]' alt="logo" />
                    <p className={`font-semibold sora text-2xl text-[var(--text)]`}>SlideSync</p>
                </div>
                <div className="menu" onClick={() => {
                    setShowMenu(!showmenu);
                    window.navigator.vibrate(0);
                }}><i className={`bx bx-dots-vertical-rounded text-3xl text-[var(--text)]`}></i></div>
            </nav>
        </>
    )
}
