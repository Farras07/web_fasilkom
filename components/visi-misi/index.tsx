"use client"
import React,{useLayoutEffect,useRef,useEffect} from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { setStatePageVisit } from '../../store/pageVisitSlices'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)
import { Misi } from '../../constants/types'
interface VisiMisiPage{
    visi:string,
    misi:Misi[]
}
export default function Index(props:VisiMisiPage) {
    const dispatch = useDispatch()
    dispatch(setStatePageVisit({page:'Visi-Misi'}))

    const visiSectionRef = useRef<HTMLInputElement>(null);
    const misiSectionRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        const animation={
            visi: gsap.fromTo(visiSectionRef.current,{autoAlpha:0,x:-100},{autoAlpha:1,x:0}),
            misi: gsap.fromTo(misiSectionRef.current,{autoAlpha:0,x:100},{autoAlpha:1,x:0}),
        }

        ScrollTrigger.create({
            animation: animation.visi,
            trigger: visiSectionRef.current,
            start: 'top-=200px center',
            end: '400px 40%',
            markers: false,
            onLeave:()=>animation.visi.reverse(),
            onLeaveBack:()=>animation.visi.reverse(),
            onEnterBack:()=>animation.visi.play(),
        })
        ScrollTrigger.create({
            animation: animation.misi,
            trigger: misiSectionRef.current,
            start: 'top-=200px center',
            end: '400px 40%',
            markers: false,
            onLeave:()=>animation.misi.reverse(),
            onLeaveBack:()=>animation.misi.reverse(),
            onEnterBack:()=>animation.misi.play(),
        })

    },[])
    const {visi,misi} = props
  return (
    <section className='flex flex-col justify-center gap-10 lg:gap-16 h-fit md:px-8 lg:h-[100vh] lg:w-full box-border'>
        <article ref={visiSectionRef} className='flex flex-col md:flex-row items-center gap-10'>
            <figure className='sm:flex sm:justify-center md:w-[25%] md:h-fit '>
                <Image src='/icons/visi.png' width={150} height={150} alt='Visi'/>
            </figure>
            <section className='flex flex-col flex-wrap gap-5 md:w-[75%]'>
                <h3 className='font-bold text-2xl text-center md:text-start text-typedBlue tracking-wider'>Visi</h3>
                <p className='text-justify lg:tracking-wide lg:leading-7'>{visi}</p>
            </section>
        </article>
        <article ref={misiSectionRef} className='flex flex-col md:flex-row-reverse  items-center gap-10'>
            <figure className='sm:flex sm:justify-center md:w-[25%] md:h-fit'>
                <Image src='/icons/misi.png' width={150} height={150} alt='Visi'/>
            </figure>
            <section className='flex flex-col flex-wrap gap-5 md:w-[75%]'>
                <h3 className='font-bold text-2xl text-center md:text-end text-typedBlue tracking-wider'>Misi</h3>
               {misi.map(((m:Misi,i:number)=>{
                return(
                    <p key={i} className='text-justify lg:tracking-wide lg:leading-7'>{m.deskripsi}</p>
                    )
               }))}
               
            </section>
        </article>
    </section>
  )
}
