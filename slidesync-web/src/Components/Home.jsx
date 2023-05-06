import React, { useContext, useState,createContext } from 'react'
import Time from './Time'
import Nav from './Nav'
import Coontrols from './Coontrols'
import Settings from './Settings'
import { Context } from '../App'
import Confirmation from './Confirmation'

export const AppContext = createContext();

export default function Home() {

  const {dark} = useContext(Context)
  const [showmenu, setShowMenu] = useState(false)
  const [showexit, setShowExit] = useState(false)

  return (
    <>
      <AppContext.Provider value={{ showmenu, setShowMenu , showexit , setShowExit}} >
        <div className={`flex flex-col justify-between py-8 max-w-sm mx-auto relative overflow-hidden h-[100%]`}>

          <Nav />
          <Time />
          <Coontrols />
          {showexit && <Confirmation />}
          <div className={`settings absolute -top-[-2px] bg-[var(--background)] text-[var(--text)] h-[100%] ${showmenu ? 'translate-x-[0px]' : ' translate-x-[1200px]'} w-full`}>
            <Settings />
          </div>

        </div>
      </AppContext.Provider>
    </>
  )
}
