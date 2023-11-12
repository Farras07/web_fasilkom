"use client"
import React,{useLayoutEffect,useRef,useEffect} from 'react'
import Image from 'next/image'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { API_URL } from '../../constants';
gsap.registerPlugin(ScrollTrigger)
export default function Index({content,BPH}:{content:string,BPH:any}) {
  const ketuaUmum = BPH.ketuaUmum
  const wakilKetua = BPH.wakilKetua
  const boxRef:any = useRef();
  const boxRef1:any = useRef();
  const nameHandler=(nama:string)=>{
    let fixedName:String= '';
    if (nama.length > 20) {
      const shortenedNama = nama.split(' ');
      let namaSingkat:String='';
      const a = shortenedNama.forEach((word) => {
        namaSingkat+=` ${word}`;
        if(namaSingkat.length < 20) {
          fixedName+=` ${word}`
        }
        else{
          const tempName = fixedName+` ${word[0]}`
          if(tempName.length<20){
            fixedName+=` ${word[0]}`
          }
        }
      })
    } else {
      fixedName=nama
    }
    return fixedName;
  }
  useEffect(() => {
    const animateBoxRef = gsap.fromTo(
        boxRef.current,
        { autoAlpha: 0, x: -100,animationDuration: 1},
        { autoAlpha: 1, duration: 1, x: 0, ease: 'power3.out',animationDuration: .5 }
      );
      const animateBoxRef1 = gsap.fromTo(
        boxRef1.current,
        { opacity: 0, x: 400 },
        { opacity: 1, duration: 1, x: 0, ease: 'power3.out', animationDuration: 1 }
      );
      // Set up ScrollTrigger to trigger animations when .trigger-element enters the viewport
      const setupScrollTrigger = () => {
            // Set up ScrollTrigger to trigger animations when .trigger-element enters and leaves the viewport
    ScrollTrigger.create({
        animation: animateBoxRef,
        trigger: boxRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnterBack: ()=> animateBoxRef.play(),
        onLeaveBack:()=> animateBoxRef.reverse(),
        // onEnter: ()=> animateBoxRef.play(),
        onLeave: ()=> animateBoxRef.reverse()
      });
    
        ScrollTrigger.create({
          animation: animateBoxRef1,
          trigger: boxRef1.current,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnterBack: ()=> animateBoxRef1.play(),
          onLeaveBack:()=> animateBoxRef1.reverse(),
          onLeave: ()=> animateBoxRef1.reverse()
        });
      };    
      setupScrollTrigger();
  }, []);
  return (
    <section data-scroll-container className=' mt-[13vh] h-fit  flex flex-col-reverse lg:flex-row py-4 justify-evenly box-border    lg:h-fit  lg:m-0 lg:p-5   lg:mx-auto lg:px-10'>
        <section ref={boxRef} data-scroll-section className='flex h-full lg:max-w-[283px] lg:w-[30%]  '>
            <section className='mt-8 w-full lg:mt-0 lg:w-fit h-full flex lg:flex-col lg:items-center justify-between'>
                <figure className='w-[40%] h-[40%] lg:w-fit lg:h-fit flex flex-col items-center lg:mb-10'>
                    <Image className='rounded-full overflow-hidden bg-cover ' src={`${API_URL}${ketuaUmum.foto.url}`} width={200} height={200} alt='avatar'/>
                    <figcaption className='text-center mt-2'>
                        <p className='text-xs min-[357px]:text-sm  lg:text-xl'>{ketuaUmum.nama}</p>
                        <p className='text-xs lg:text-xl font-bold text-typedBlue'>{ketuaUmum.jabatan.nama}</p>
                    </figcaption>
                </figure>
                <figure className='w-[40%] h-[40%] lg:w-fit lg:h-fit flex flex-col items-center'>
                    <Image className='rounded-full overflow-hiddenbg-cover mb-1' src={`${API_URL}${wakilKetua.foto.url}`} width={200} height={200} alt='avatar'/>
                    <figcaption className='text-center mt-2'>
                        <p className='text-xs min-[357px]:text-sm lg:text-xl'>{wakilKetua.nama}</p>
                        <p className='text-xs lg:text-xl font-bold text-typedBlue'>{wakilKetua.jabatan.nama}</p>
                    </figcaption>
                </figure>
            </section>
        </section>

        <section ref={boxRef1} className='h-full w-full lg:max-w-[703px] lg:w-fit lg:h-fit box-border flex    '>
            <section className='h-full w-fit flex flex-col flex-wrap  lg:flex-nowrap gap-6 lg:gap-12 box-border text-justify lg:px-6 '>
                <div className='flex flex-col flex-wrap text-center lg:text-start'>
                    <h2 className='text-4xl lg:text-9xl tracking-[.9rem] font-semibold drop-shadow-cust-1 text-white  '>PERSEPSI</h2>
                    <span className='text-lg lg:text-2xl tracking-[.23rem] font-semibold text-typedBlue'>Ketua & Wakil Badan Eksekutif Mahasiswa</span>
                </div>
                <div className='flex flex-col flex-wrap'>
                    <p className='text-xs lg:text-sm leading-5'>
                      {content.length > 1500
                                ? content.slice(0, 1500) + "..."
                                : content}
                      </p>
                </div>
            </section>
        </section>
    </section>
  )
}
