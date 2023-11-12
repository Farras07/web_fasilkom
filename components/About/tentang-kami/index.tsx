import React,{useEffect} from 'react'
import Image from 'next/image'
import { API_URL } from '../../../constants';
import { useSelector, useDispatch } from 'react-redux'
import { setStatePageVisit } from '../../../store/pageVisitSlices'
interface AboutInterface{
    namaKabinet:string,
    content:string,
    logo:string;
}
export default function Index(props: AboutInterface) {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setStatePageVisit({page:'Berita'}))
    },[dispatch])
    const {namaKabinet,content,logo}= props
  return (
    <section className='h-fit lg:h-screen box-border flex flex-col lg:gap-20 pl-0 lg:pl-[2.5rem] mt-[13vh] '>
        <div className='m-auto w-fit text-center'>
            <h3 className='text-2xl lg:text-3xl font-bold submenu w-fit'>Tentang Kami</h3>
            <h4 className='text-lg lg:text-2xl tracking-wide font-black text-outline'>{namaKabinet}</h4>
        </div>
        <div className='absolute w-[8rem] h-[8rem] left-4 sm:left-14 lg:left-20 top-20 lg:top-10  animate-spin-cust '>
            <Image src='/vector/vector.svg' width={200} height={200} alt='Kabinet Aerial'/>
        </div>
        <div className='flex flex-col-reverse gap-[2rem] lg:gap-0 lg:flex-row'>
            <article className=' flex flex-col justify-center lg:justify-around pb-14 w-full lg:w-[60%] lg:pt-20 box-border'>
                <article className='flex flex-wrap'>
                    <p className='text-sm text-justify leading-5'>{content}</p>
                </article>
            </article>
            <aside className=' relative mt-[8rem] lg:mt-0 flex flex-col gap-[3rem]  w-full h-fit lg:h- lg:w-[40%]'>
                <div className='w-[15rem] h-[15rem] sm:w-[20rem] sm:h-[20rem] m-auto lg:w-[22rem] lg:h-[22rem] lg:relative flex justify-center'>
                    <Image src={`${API_URL}${logo}`} width={300} height={600} alt='Kabinet Aerial' />
                </div>
                <div className='w-full flex flex-col items-center'>
                    <h3 className='text-lg font-bold submenu w-fit'>BEM FASILKOM UPNVJT</h3>
                    <h4 className='text-lg tracking-wide font-black text-outline'>{namaKabinet}</h4>
                </div>  
            </aside>
        </div>

    </section>
  )
}



