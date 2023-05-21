import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../App';
import { AppContext } from './Home';
import notify from '../assets/tap3.wav'


export default function Coontrols() {

    const [status, setStatus] = useState(1);
    const [range, setRange] = useState(0);
    let { dark , state } = useContext(Context)
    let { showexit  } = useContext(AppContext)
    
    const audio = new Audio(notify);
    
    const handleRange = (e) => {

        setRange(e.target.value)

        if(e.target.value==10 || e.target.value==-10){
                state.sound && audio.play();
                state.vibrate && window.navigator.vibrate(100);
            }
        
    }

    // const handleTouch=(e)=>{
    //         // state.vibrate && console.log("state.vibrate", state.vibrate)
    //         console.log("not 10")
    //         audio.play();
    //         if(e.target.value===10 || range===10){
    //             console.log("10");
    //         }

    // }
    const goBack = (e) => {
        // console.log("triggered !!")

        // console.log("NOw value is : " , e.target.value )

            if(e.target.value>0){

                let a = e.target.value;

                let i = setInterval(() => {
                    a--;
                    setRange(a);
                    if(a===0)clearInterval(i);
                }, 15);
            }
            if(e.target.value<0){

                let b = e.target.value;

                let j = setInterval(() => {
                    b++;
                    setRange(b);
                    if(b===0)clearInterval(j);
                }, 15);
            }  
    }

    useEffect(()=>{

        // console.log("inside useEFfect : range = " , range)

            let low = setInterval(()=>{

                if(range==-10){
                    console.log("previous")
                    state.sound && audio.play();
                    state.vibrate && window.navigator.vibrate(100);
                }
            },1000)
            
            if(range!==-10){

                return ()=>{
                    clearInterval(low)
                }
            }
    },[range])
    useEffect(()=>{

        // console.log("inside useEFfect : range = " , range)

            let high = setInterval(()=>{

                if(range==10){
                    console.log("next")
                    state.sound && audio.play();
                    state.vibrate && window.navigator.vibrate(100);
                }
            },1000)

            if(range!==10){

                return ()=>{
                    clearInterval(high)
                }
            }
    },[range])

        

    return (
        <>

            <div className={`${dark ? 'text-[#E6E6E7]' : 'text-black'} flex flex-col h-[40%] justify-around ${(showexit) && 'opacity-10'}`}>
                <div className="cntr-1 flex items-center justify-center gap-24">
                    <button className='text-lg border border-[var(--text)] h-12 w-12 rounded-[50%] flex items-center justify-center text-[var(--text)]'>Esc</button>
                    <button className='text-xl border border-[var(--text)] h-12 w-12 rounded-[50%] flex items-center justify-center'><i className='bx bx-fullscreen text-[var(--text)]'></i></button>
                </div>

                <div className={`${status ? 'bg-[#53CE51]' : 'bg-[#c30808]'} self-center rounded-full w-[28.34px] h-3 mt-4`}></div>

                <div className={`input-box w-[65%] mx-auto bg-[var(--secondary)] shadow-[rgba(0,0,0,0.7)] shadow-inner rounded-full flex items-center justify-center h-24`}>
                    <input type="range" min="-10" max="10" name="range" id="range" className="bg-transparent rounded-2xl" value={range} onChange={handleRange} onTouchEnd={goBack} onMouseOut={goBack}/>
                    {/* <input type="range" min="-10" max="10" name="range" id="range" className="bg-transparent rounded-2xl" value={range} onTouchMove={handleRange} onTouchStart={handleRange} onChange={handleRange} onTouchEnd={goBack} onMouseOut={goBack}/> */}
                </div>
            </div>

        </>
    )

    }
/*

if (e.target.value == 10) {

                                let j = 10;
                                let intrv2 = setInterval(() => {
                                    j--;
                                    e.target.value = j;
                                    if (j == 0) {
                                        clearInterval(intrv2)
                                    }
                                }, 15)

                            }
                            if (e.target.value == -10) {

                                let i = -10;
                                let intrv1 = setInterval(() => {
                                    i++;
                                    e.target.value = i;
                                    if (i == 0) {
                                        clearInterval(intrv1)
                                    }
                                    // range.value=0;
                                }, 15)

                            }

*/

    //     useEffect(() => {

    //         console.log("USEEFFECT CALLED", state.vibrate)

    //         let range = document.querySelector('#range');

    //         range.value = 0;

    //         range.addEventListener('change', (e) => {

    //             range.value = e.target.value;

    //             // if (range.value < 0) {
    //             //     moveR();
    //             //     // range.value=0;
    //             // }
    //             // if (range.value > 0) {
    //             //     moveL();
    //             //     // range.value=0;
    //             // }
    //             // if (range.value == -10 || range.value == 10) {
    //             //     console.log(state.vibrate)
    //                 console.log(state.vibrate) 
    //             // }
    //         })
    //         console.log("SUEEND", state.vibrate)

    //         // setState(initials => ({ ...initials, vibrate: state.vibrate }))

    // }, [state.vibrate])









        // if (e.target.value == 10) {
        //     // console.log("10");
        //     this.high = setInterval(()=>{
        //         console.log("value is 10");
        //     },1000)
        // }
        // else{
        //     clearInterval(high);
        // }
        // if (e.target.value == -10) {
        //     // console.log("-10");
        //     this.low = setInterval(()=>{
        //         console.log("value is -10");
        //     },1000)
        // }
        // else{

        //     clearInterval(low);
        // }

        /*if(e.target.value!=10){
            clearInterval(high);
        }
        if(e.target.value!=-10){
            clearInterval(low);
        }*/

        // console.log("Now value is :" , e.target.value)