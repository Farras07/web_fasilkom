import React,{useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setStateNavbar } from '../../store/hamburgerSlices'

interface navbarSliceType{
    navbarSlice:{
      value:boolean
    }
  }

export default function Hamburger() {
    const navbarShow = useSelector((state:navbarSliceType) => state.navbarSlice.value)
    const dispatch = useDispatch()
    
  return (
    <section onClick={()=>dispatch(setStateNavbar(''))} className={`relative box-border rounded-md hover:bg-slate-400 cursor-pointer ${!navbarShow? 'bg-[rgb(148 163 184)]':'bg-transparent'}`}>
        <input className='cursor-pointer absolute  w-full h-full opacity-0 pointer-events-auto' type="checkbox"/>
        <div className='cursor-pointer flex w-fit h-full  lg:hidden rounded-md p-1'>
            <div className='w-full h-full'>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" className={` ${!navbarShow?'flex':'hidden'} svg-inline--fa fa-bars h-6 w-6`} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"></path></svg>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" className={`${!navbarShow?'hidden':'flex'} svg-inline--fa fa-xmark h-6 w-6`} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg>
            </div>
        </div>
    </section>
  )
}
