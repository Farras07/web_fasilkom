import React, { useState, useEffect } from "react";
import { createAction } from '@reduxjs/toolkit';
import Link from "next/link";
import Image from 'next/image'
import styles from "./styles.module.scss";
import ButtonOutline from "../Assets/ButtonOutline";
import Headroom from 'react-headroom'
import Hamburger from "../Assets/Hamburger";
import { useSelector, useDispatch } from 'react-redux'
import { navbarSlice, setStateNavbar } from '../../store/hamburgerSlices'
import { setStateLink } from '../../store/linkDetectSlices'
interface NavLink {
  text: string;
  link: string;
};

interface profileLinks {
  text:string;
  links:{
    text:string;
    link:string;
  }[];
}

export const setStateNavbarFalse = createAction<boolean>('navbar/setStateNavbarFalse');

const navLinks: (NavLink | profileLinks)[] = [
  {
    text: "Profile",
    links:[
      {
        text: "Struktur Organisasi",
        link: "/struktur-organisasi",
      },
      {
        text: 'Tentang Kami',
        link: '/tentang-kami'
      }
    ],
  },
  {
    text: "Fasilkom News",
    link: "/berita",
  },
  {
    text: "Our Services",
    links: [
      {
        text:'Aduan dan Aspirasi',
        link:'/aduan-dan-aspirasi'
      },
      {
        text:'Bisnis Mitra',
        link:'/bisnis-mitra'
      }
    ],
  },
];

interface navbarSliceType{
  navbarSlice:{
    value:boolean
  }
}
interface linkClickedSliceType{
  linkClickedSlice:{
    value:string
  }
}
interface pageVisitSliceType{
  pageVisitSlice:{
    value:string
  }
}
export const Navbar = () => {
  const dispatch = useDispatch()
  const navbarShow = useSelector((state:navbarSliceType) => state.navbarSlice.value)
  const linkClicked = useSelector((state:linkClickedSliceType) => state.linkClickedSlice.value)
  const pageVisit = useSelector((state:pageVisitSliceType) => state.pageVisitSlice.value)

  const handleParentMenuArrowExist=()=>{
    let lengthMenuArrowExist = 0
    const menuArrowExist = navLinks.forEach((menu)=>{
      if(menu.hasOwnProperty('links')){
        lengthMenuArrowExist+=1
      }
    })
    return lengthMenuArrowExist
  }

  const [scrollY, setScrollY] = useState(0);
  const [submenuVisible, setSubmenuVisible] = useState(new Array(navLinks.length).fill(false));
  const [arrowMenuClicked, setArrowMenuClicked] = useState(new Array(handleParentMenuArrowExist()).fill(false));

  const toggleSubmenu = (index:number) => {
    // Toggle the submenu visibility for the specified index
    const updatedSubmenuVisible = [...submenuVisible];
    updatedSubmenuVisible[index] = !updatedSubmenuVisible[index];
    setSubmenuVisible(updatedSubmenuVisible);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const handleClickedNavbar=(link:string)=>{
    dispatch(setStateNavbar({link}))
    dispatch(setStateLink({link}))
  }
  const handleLogoClicked=(link:string)=>{
    dispatch(setStateLink({link}))
    if (navbarShow){
      dispatch(setStateNavbar({link}))
    }
  }
  
  return (
    <Headroom className="fixed z-[99] min-w-[100%]" style={{
      transition: 'all 1s ease-in-out'
    }}>
      <header className={`flex items-center justify-between lg:justify-evenly w-[100vw]  ${scrollY>0 && pageVisit!='Bisnis-Mitra' ?'bg-[#FFD7B7]': scrollY>0 && pageVisit==='Bisnis-Mitra'?'bg-orange-500' : 'bg-transparent'} ${pageVisit!='Bisnis-Mitra' ? 'h-[13vh]' : 'pb-2 pt-2 lg:pt-0 lg:pb-0 lg:h-[17vh] lg:px-12'}`}  style={{
      transition: 'all 1s ease-in-out'
    }}>
          <section className='flex w-[60%] lg:w-[20%]'>
              <Link href="/">
                  <a onClick={()=>handleLogoClicked('Homepage')} className="flex items-center ">
                    <Image
                        src={`${pageVisit==='Bisnis-Mitra' ? '/logo/kabinetAerialWhite.svg' : '/logo/kabinetArial.svg'}`}
                        alt="Logo BEM Fasilkom UPN 'Veteran' Jawa Timur"
                        className={styles.logo_navbar}
                        width={pageVisit==='Bisnis-Mitra' ? 60: 50}
                        height={pageVisit==='Bisnis-Mitra' ? 60: 40}
                    />
                    <div className="text-left flex flex-col justify-center">
                      {pageVisit==='Bisnis-Mitra'?
                      (
                        <h5 className='text-white font-semibold lg:text-base text-sm tracking-wide'>Bismit Aerial.</h5>
                      ) :
                      (
                        <>
                          <h5 className=" font-semibold text-xs sm:text-sm tracking-wide">BEM FASILKOM 2023</h5>
                          <span className=" font-extralight text-xs tracking-wide">{'UPN "VETERAN" Jawa Timur'}</span>
                        </>
                      )
                      }
                    </div>
                  </a>
              </Link>
          </section>
          <nav className={`${pageVisit==='Bisnis-Mitra'? 'lg:items-center': null} bg-white lg:bg-transparent lg:justify-evenly text-2xl px-5 lg:px-0 lg:text-base w-screen absolute ${navbarShow?'top-[13vh]':'-top-[130vh]'} duration-500 -ml-2 md:w-full lg:ml-0 lg:static flex flex-col py-10 lg:py-0 gap-10 lg:gap-20 lg:flex-row lg:w-[70%] h-screen z-100 lg:z-0 max-h-screen lg:max-h-none lg:h-fit box-content mx-5`}>
            <section className={`flex flex-col lg:flex-row justify-around  ${pageVisit==='Bisnis-Mitra'? 'lg:px-16 lg:items-center' : null } w-fit max-h-[80%] lg:max-h-none lg:w-[70%] h-[60%] lg:h-fit `}>
              {pageVisit != 'Bisnis-Mitra'? 
                navLinks.map((menu:any,i:number) => menu.links? (
                  <section key={`menu-${i}`} className="group relative z-[100] cursor-pointer box-border h-fit" onClick={() => {
                    toggleSubmenu(i)
                    setArrowMenuClicked((prevArrowMenuClicked) => {
                      const updatedArrowMenuClicked = [...prevArrowMenuClicked];
                      updatedArrowMenuClicked[i] = !updatedArrowMenuClicked[i];
                      return updatedArrowMenuClicked;
                    });
                    }} >
                    <div className="lg:group-hover:border-b-2 border-b-black flex justify-between w-fit lg:px-3">
                        <p className={`${linkClicked===menu.text?'text-typedBlue font-bold':'text-black'}`}>{menu.text}</p>
                        <Image className={`lg:group-hover:rotate-180 transition-all duration-400 ${arrowMenuClicked[i] ? 'rotate-180 lg:rotate-0' : ''}`} src={'/icons/caret.svg'} width={10} height={10} alt="Profile"></Image>
                    </div>
                    <ul className={`mt-2 lg:mt-0 ${submenuVisible[i] ? "flex flex-col gap-4 h-fit py-2" : "hidden"} lg:py-0 lg:block lg:absolute group lg:invisible lg:group-hover:visible w-[200px] lg:shadow lg:shadow-slate-400 bg-white  overflow-y-auto  min-h-[fit] max-h-[8rem] rounded-md`}>
                    {menu.links.map((subMenu:NavLink,subIndex:number)=>(
                      <li key={`submenu-${subIndex}`} className="lg:invisible lg:group-hover:visible w-full flex flex-col gap-3 lg:gap-0 ">
                        <Link href={subMenu.link}>
                          <a onClick={()=>handleClickedNavbar(menu.text)} className={`px-[.5rem] py-1 block lg:text-center h-full hover:bg-tangerine hover:text-typedBlue text-base lg:text-sm font-medium `}>{subMenu.text}</a>
                        </Link>
                      </li >
                        ))}
                    </ul>
                  
                  </section>
                )
                :(
                  <section key={`menu-${i}`}>
                    <Link href={menu.link}><a onClick={()=>handleClickedNavbar(menu.text)} className={`${linkClicked===menu.text?'text-typedBlue font-bold':'text-black'} lg:hover:border-b-2 border-b-black w-fit`}>{menu.text}</a></Link>
                  </section>
                ))
              : (
                <>
                  <Link href={'#service'}><a onClick={()=>handleClickedNavbar('Service')} className={`text-black lg:text-white text-lg hover:text-xl hover:font-bold hover:duration-100 w-fit`}>Service</a></Link>
                  <Link href={'#portofolio'}><a onClick={()=>handleClickedNavbar('Portofolio')} className={`text-black lg:text-white text-lg hover:text-xl hover:font-bold hover:duration-100 w-fit`}>Portofolio</a></Link>
                  <Link href={'#testimonials'}><a onClick={()=>handleClickedNavbar('Testimonials')} className={`text-black lg:text-white text-lg hover:text-xl hover:font-bold hover:duration-100 w-fit`}>Testimonials</a></Link>
                </>
              )}
            </section>
            <ButtonOutline content={`${pageVisit==='Bisnis-Mitra' ? 'Contact Us' : 'Event'}`} link={`${pageVisit==='Bisnis-Mitra' ? 'https://bit.ly/contact-bismit' : '/event'}`} width={'6.3rem'} bismitMode={pageVisit==='Bisnis-Mitra' ? true : false}/>
          </nav>
          <section className="w-[20%] lg:hidden flex justify-end pr-5 md:pr-8">
            <Hamburger />
          </section>
      </header>
    </Headroom>
  );
};

