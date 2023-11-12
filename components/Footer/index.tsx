import {useRef,useEffect} from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import Link from 'next/link'

interface pageVisitSliceType{
  pageVisitSlice:{
    value:string
  }
}

export const Footer = () => {
  const pageVisit = useSelector((state:pageVisitSliceType) => state.pageVisitSlice.value)
  return (
    <footer className={`w-full ${pageVisit==='Bisnis-Mitra'? null: 'lg:px-10 lg:pt-16'}  flex flex-col justify-center bg-peach mt-[13vh]`}>
      {pageVisit==='Bisnis-Mitra' ? (
        <>
          <section className="w-full h-full flex flex-col justify-between border-b-2 border-black bg-footer-bismit bg-cover bg-top">
            <section className=" w-full h-[60vh] bg-footer-cover-transparent flex justify-center items-center">
              <div className='flex flex-col items-center gap-5'>
                <p className="text-white text-[1.2em] text-center">Grow Your Business Faster Than Ever Before</p>
                <Link href="https://bit.ly/contact-bismit">
                  <a className='hover:scale-[1.1] duration-300 w-fit bg-white text-tangerine py-3 px-6 rounded-xl'>Contact Us</a>
                </Link> 
              </div>
            </section>
            <section className={`h-[10vh] w-full bg-orange-500 flex items-center justify-center`}>
              <p className="text-white text-[.7em] sm:text-[.9em] text-center">Copyright © 2023, Bisnis Mitra BEM Fasillkom UPNVJT</p>
            </section>
          </section>
        </>
      ): (
        <>
          <section className="w-full h-full pt-10 lg:pb-4 lg:pt-0 flex flex-col lg:flex-row justify-between border-b-2 border-black">
            <article className='w-full lg:w-[26%] flex flex-col items-center justify-center gap-8 mb-8 '>
              <div className="flex justify-between">
                <Image src={'/logo/kabinetArial.svg'} width={100} height={100} alt='KabinetAerial'/>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <Image src={'/logo/UPN.svg'} width={40} height={40} alt={'UPN "Veteran" Jawa Timur '}/>
                    <Image src={'/logo/BEM_FASILKOM.svg'} width={40} height={40} alt={'UPN "Veteran" Jawa Timur '}/>
                    <Image src={'/logo/KM.svg'} width={40} height={40} alt={'UPN "Veteran" Jawa Timur '}/>
                  </div>
                  <div>
                    <p className="font-semibold">BEM FASILKOM 2023</p>
                    <span>{'UPN "VETERAN" Jawa Timur'}</span>
                  </div>
                </div>
              </div>
              <p className="lg:mr-14 font-bold tracking-wide">{'"Satu Fasilkom, Kita Kuat!"'}</p>
            </article>
            <article className="flex w-full mt-4 lg:w-[45%] lg:mt-0 flex-col items-center gap-4">
              <h5 className="text-2xl font-black">Sekretariat</h5>
              <p className="flex flex-wrap text-center w-[90%]">{'Gedung Giri Santika UPN "Veteran" Jawa Timur.Gn. Anyar, Kec. Gn. Anyar, Surabaya, Jawa Timur 60294'}</p>
              <iframe className='w-[90%] h-[15rem] lg:w-full lg:h-[20rem] border-2 border-black' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1978.5859369772957!2d112.7869155383215!3d-7.334585998168465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fab8189e09c1%3A0xe23a95446109db9!2sGedung%20Giri%20Santika%20UPN%20Veteran%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1696789341476!5m2!1sid!2sid" 
              width="450" height="300" allowFullScreen={true} loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"></iframe>        
            </article>
            <article className="w-full flex flex-col items-center mt-10 mb-5 lg:items-start lg:mb-0 lg:mt-0 lg:w-[25%]">
              <h5 className="text-2xl font-black">Follow Us!</h5>
              <div className="mt-5 flex flex-col gap-3">
                <a className="group flex items-center gap-4" href="https://instagram.com/bemfasilkom.upnjatim" target='_blank' rel="noreferrer">
                  <Image className='group-hover:animate-bounce' src={'/icons/VectorInstagram.svg'} width={20} height={40} alt={'UPN "Veteran" Jawa Timur '}/>
                  <p className="group-hover:text-typedBlue">@bemfasilkom.upnjatim</p>
                </a>
                <a className="group flex items-center gap-4" href="https://www.linkedin.com/company/bem-fakultas-ilmu-komputer-upn-veteran-jawa-timur/" target='_blank' rel="noreferrer">
                  <Image className='group-hover:animate-bounce' src={'/icons/vectorLinkedin.svg'} width={20} height={40} alt={'UPN "Veteran" Jawa Timur '}/>
                  <p className="group-hover:text-typedBlue">@bemfasilkom_upnvjt</p>
                </a>
                <a className="group flex items-center gap-4" href="https://www.tiktok.com/@bemfasilkom_upnvjt" target='_blank' rel="noreferrer">
                  <Image className='group-hover:animate-bounce' src={'/icons/VectorTiktok.svg'} width={20} height={40} alt={'UPN "Veteran" Jawa Timur '}/>
                  <p className="group-hover:text-typedBlue">@bemfasilkom_upnvjt</p>
                </a>  
                <Link href="mailto:bem.fasilkom@upnjatim.ac.id">
                  <a className="group flex items-center gap-4" >
                    <Image className='group-hover:animate-bounce' src={'/icons/vectorEmail.svg'} width={20} height={40} alt={'UPN "Veteran" Jawa Timur '}/>
                    <p className="group-hover:text-typedBlue">bem.fasilkom@upnjatim.ac.id</p>
                  </a>
                </Link>
              </div>

            </article>
          </section>
          <div className="flex items-center justify-center text-center p-2">
            <p>© 2023 All rights reserved, Bidang Penelitian dan Pengembangan BEM FASILKOM UPN “Veteran” Jawa Timur</p>
          </div>

        </>
      )}
    </footer>
  );
};
