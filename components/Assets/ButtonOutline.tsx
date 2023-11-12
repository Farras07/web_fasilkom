import React from 'react'
import { API_URL } from '../../constants'

interface buttonProps{
  content : string,
  link:string,
  width?: string,
  bismitMode?: Boolean
}
export default function ButtonOutline({content,link,width,bismitMode}:buttonProps) {

  return (
    <>
        <div className={`${bismitMode? 'bg-transparent' : ' bg-red-600 bg-gradient-cust-orange2 p-[.1rem]'} lg:flex group rounded-[10px] w-fit  lg:m-auto `}>
            <a href={link} className={`group from-[#FA6D01] to-[#FA870199] via-yellow-500 px-2 relative overflow-hidden md:w-full ${width!=''? width :' lg:w-[13rem]'} flex justify-center py-[.35rem] font-medium 
                        text-sm rounded-[9px]  ${bismitMode? 'bg-transparent group-hover:bg-gradient-to-r outline outline-orange-300 py-[.6rem]' : 'bg-white group-hover:bg-gradient-to-r'} cursor-pointer`}>
                <p className={`pr-4 lg:pr-2 lg:pl-2  pl-3  ${bismitMode? 'lg:text-white text-base' : 'text-black text-sm'}`}>{content}</p>
                <div>
                  {!bismitMode? 
                    <svg viewBox="0 0 46 16" height="7" width="25" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal" className="-translate-x-1 fill-slate-700 mt-2 transition-all duration-300 group-hover:translate-x-[.2rem] group-hover:scale-x-95"><path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path></svg>
                  :
                  null}
                </div>
            </a>
        </div>
    </>
  )
}
