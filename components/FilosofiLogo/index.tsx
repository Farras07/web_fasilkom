import React,{useRef,useLayoutEffect,useEffect} from 'react'
import Image from 'next/image'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)
import { API_URL } from '../../constants'

interface filosofiLogoProps{
  url:string
}
export default function Index(props:filosofiLogoProps) {
  const sectionRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    const sectionAnimation= gsap.fromTo(sectionRef.current,{autoAlpha: 0, y: 200,scale:.6,animationDuration:2},{autoAlpha: 1, y: 0, ease: 'bounce.out',scale:1,animationDuration:2})

    ScrollTrigger.create({
      animation: sectionAnimation,
      trigger: sectionRef.current,
      start: 'top-=500 center',
      end: 'bottom center',
      markers: false,
      onLeaveBack:()=>sectionAnimation.reverse(),

    })
  },[])
  const {url} = props
  return (
    <section ref={sectionRef} className='mt-[13vh] flex flex-col gap-10 h-fit w-full box-border '>
        <section className='w-full text-center'>
            <h3 className='m-auto font-bold text-typedBlue text-3xl submenu w-fit after:-bottom-2 after:right-[calc(100%/5)] after:w-[115px]'>Filosofi Logo</h3>
        </section>
        <section className='w-full flex justify-center items-center box-border'>
            <Image src={`${API_URL}${url}`} width={800} height={800} alt='Filosofi Logo' quality={100}/>
        </section>
    </section>
  )
}
