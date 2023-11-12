"use client"
import React,{useLayoutEffect,useRef,useEffect} from 'react'
import Image from 'next/image'
import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
  } from "next";
import {  HomepageContent } from "../../../constants/types";
import { API_URL } from "../../../constants";
import ButtonOutline from '../../Assets/ButtonOutline'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)
export default function Index({HomepageContent}: {HomepageContent: HomepageContent}) {
    const {subtitle_utama , tentang_bem_fasilkom}= HomepageContent

    const subtitleRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        const animation={
            subtitle: gsap.fromTo(subtitleRef.current,{autoAlpha: 0,x: -100,},{autoAlpha: 1,x: 0, ease: 'power3.out'}),
            desc:gsap.fromTo(descRef.current,{autoAlpha: 0, y: 200,scale:.6},{autoAlpha: 1, y: 0, ease: 'power3.out',scale:1}),
            descScrollDown:gsap.fromTo(descRef.current,{autoAlpha: 1, y: 0, ease: 'power3.out',},{autoAlpha: 0, y: -200}),
        }

        ScrollTrigger.create({
            animation: animation.subtitle,
            trigger: subtitleRef.current,
            start: 'top center',
            end: '520px center',
            markers: false,
            onLeaveBack:()=>animation.subtitle.reverse(),
        })
        ScrollTrigger.create({
            animation: animation.desc,
            trigger: '.container-trigger',
            start: 'top center',
            end: 'bottom center',
            markers: false,
            onLeaveBack:()=>animation.desc.reverse(),
        })
    },[])
  return (
    <section className='h-fit lg:h-fit box-border justify-between pl-0 lg:pl-20 mt-[5em]  '>
        <div ref={subtitleRef}>
            <h3  className='text-3xl font-bold submenu pr-[10rem] w-fit after:top-[50%] after:right-20 after:w-[56px]'>Kenalan Yuk! </h3>
                <div className="text-3xl relative z-6 tracking-wide font-black text-outline w-[15rem]">
                    Kabinet Aerial
                </div>
        </div>
        <div className='container-trigger flex flex-col-reverse gap-[10rem] lg:gap-0 lg:flex-row'>
            <article ref={descRef} className=' flex flex-col justify-center lg:justify-around pb-14 w-full lg:w-[60%] box-border'>
                <article className='flex flex-wrap'>
                    <p className='text-sm text-justify leading-5'>
                        {tentang_bem_fasilkom.length > 1400
                            ? tentang_bem_fasilkom.slice(0, 200) + "..."
                            : tentang_bem_fasilkom
                        }
                    </p>
                </article>
                <section className='w-fit mt-10 lg:mt-0 m-auto lg:m-0'>
                    <ButtonOutline content={'Lihat Selengkapnya'} link={'/tentang-kami'}/>
                </section>
            </article>
            <aside className=' relative mt-[8rem] lg:mt-0 lg:-top-[4rem] w-full h-fit lg:h-fit lg:w-[40%] flex justify-center lg:justify-end'>
                <div className='absolute w-[8rem] h-[8rem] -top-[7rem]  lg:-top-5 lg:left-[1.5rem] lg:w-fit lg:h-fit animate-spin-cust'>
                    <Image src='/vector/vector.svg' width={200} height={200} alt='Kabinet Aerial'/>
                </div>
                <div ref={imageRef} className='w-[8rem] h-[8rem] -mt-10 ml-3 lg:ml-0 lg:mt-0 lg:w-fit lg:h-fit'>
                    <Image src='/logo/kabinetArial.svg' width={300} height={600} alt='Kabinet Aerial' />
                </div>
            </aside>
        </div>

    </section>
  )
}


