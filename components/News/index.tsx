"use client"
import React,{useRef,useLayoutEffect,useEffect} from 'react'
import CardNews from './CardNews'
import ButtonOutline from '../Assets/ButtonOutline'
import { DocumentHead } from '../DocumentHead'
import { DetailBerita } from "../../constants/types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default function Index({listBerita}: {listBerita: DetailBerita[]}) {
  const sectionRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
  const animation={
    secEnter:gsap.fromTo(sectionRef.current,{autoAlpha: 0, y: 200,scale:.6},{autoAlpha: 1, y: 0, ease: 'power3.out',scale:1}),
    secHide:gsap.fromTo(sectionRef.current,{autoAlpha: 1, y: 0, ease: 'power3.out',},{autoAlpha: 0, y: -200}),
  }

  ScrollTrigger.create({
    animation: animation.secEnter,
    trigger: '.container-trigger',
    start: 'bottom center',
    end: 'bottom 40%',
    markers: false,
    onEnterBack: ()=> animation.secHide.reverse(),
    onLeaveBack:()=>animation.secEnter.reverse(),
})
},[])

  return (
    <section className='container-trigger mt-[13vh] w-full h-fit lg:h-fit box-border flex flex-col items-center '>
        <h3 className="text-center m-auto font-bold text-typedBlue text-3xl submenu w-fit after:-bottom-2 after:right-[calc(100%/4)] after:w-[115px]">Fasilkom News</h3>
        <article ref={sectionRef} className='flex flex-row flex-wrap gap-5 lg:gap-4 justify-around md:justify-between min-[1100px]:justify-around lg:flex-row lg:ml-0 lg:items-center w-full lg:w-fit min-[1350px]:w-[80%] h-fit mt-[2rem] mb-5 lg:h-[80%] lg:mb-0'>
          {listBerita.length > 0? 
            listBerita.map((berita, index) => (
              <CardNews key={index} berita={berita}/>
            ))
          : null}
        </article>
        <div className='w-fit m-auto my-5'>
          <ButtonOutline content='Lihat Selengkapnya' link='/berita'/>
        </div>
    </section>
  )
}
