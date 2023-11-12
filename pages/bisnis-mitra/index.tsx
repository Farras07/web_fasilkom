import React,{useEffect,useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setStatePageVisit } from '../../store/pageVisitSlices'
import Particles from "react-tsparticles";
import particlesConfig from '../../components/Assets/Particles'
import Typed from 'typed.js'
import { API_URL } from "../../constants";
import { CategoriesProjects, Portofolios, Testimonials } from "../../constants/types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
  } from "next";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Image from 'next/image'
import { DocumentHead } from "../../components/DocumentHead";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)


const Index: NextPage<
InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
	const {categoriesProject,portofolios,testimonials} = props
	const dispatch = useDispatch()
	const typedRef = useRef(null) 
	const refService = useRef<HTMLDivElement>(null)
	const refBenefit = useRef<HTMLDivElement>(null)
	const refPortofolio = useRef<HTMLDivElement>(null)
	const refTestimonials = useRef<HTMLDivElement>(null)
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
		dispatch(setStatePageVisit({page:'Bisnis-Mitra'}))
        const typed = new Typed(typedRef.current, {
          strings: categoriesProject.map((item) => item.categories), // Strings to display
          // Speed settings, try diffrent values untill you get good results
          startDelay: 300,
          typeSpeed: 100,
          backSpeed: 100,
          backDelay: 100,
          smartBackspace: true,
          loop: true,
          showCursor: true,
          cursorChar: "|"
        });
    
        // Destropying
        return () => {
          typed.destroy();
        };
      }, [dispatch]);
	
  const responsive = {
	superLargeDesktop: {
	  // the naming can be any, depends on you.
	  breakpoint: { max: 4000, min: 3000 },
	  items: 5
	},
	desktop: {
	  breakpoint: { max: 3000, min: 1200 },
	  items: 3
	},
	tablet: {
	  breakpoint: { max: 1200, min: 840 },
	  items: 2
	},
	mobile: {
	  breakpoint: { max: 840, min: 0 },
	  items: 1
	}
  };

  const tabClicked =()=>{
	gsap.fromTo(refPortofolio.current,{autoAlpha:0,y:200,scale:.5},
		{autoAlpha:1,y:0,scale:1,ease:'power3.out',animationDuration:1})
  }


  useEffect(()=>{
    const animation ={
      service: gsap.fromTo(refService.current,{autoAlpha:0,x:200},{autoAlpha:1,x:0}),
	  benefit:gsap.fromTo(refBenefit.current,{autoAlpha:0,x:-200},{autoAlpha:1,x:0}),
      portofolio:gsap.fromTo(refPortofolio.current,{autoAlpha:0,y:100},{autoAlpha:1,y:0,ease:'power3.out'}),
	  testimonials:gsap.fromTo(refTestimonials.current,{autoAlpha:0,y:200},{autoAlpha:1,y:0,ease:'power3.out'})
    }

    ScrollTrigger.create({
      animation: animation.service,
      trigger: '.scroll-trigger',
      start: 'top center',
      end: 'bottom 30%',
      markers: false,
      onLeaveBack:()=>animation.service.reverse(),
	  onLeave:()=>gsap.to(refService.current,{autoAlpha:0,x:-200}),
	  onEnterBack:()=>gsap.to(refService.current,{autoAlpha:1,x:0})
    })
    ScrollTrigger.create({
      animation: animation.benefit,
      trigger: '.scroll-trigger-benefit',
      start: 'top center',
      end: 'bottom 30%',
      markers: false,
      onLeaveBack:()=>animation.benefit.reverse(),
	  onLeave:()=>gsap.to(refBenefit.current,{autoAlpha:0,x:200}),
	  onEnterBack:()=>gsap.to(refBenefit.current,{autoAlpha:1,x:0})
    })
    
    ScrollTrigger.create({
      animation: animation.testimonials,
      trigger: '.scroll-trigger-testimonials',
      start: 'top-=100px center',
      end: 'bottom 30%',
      markers: false,
      onLeaveBack:()=>animation.testimonials.reverse(),
    })
  },[])
  return (
    <>
	  <DocumentHead pageTitle="Bisnis Mitra" />
      <section id='hero' className="relative h-[120vh] w-full border-box transition-all duration-500 object-fill bg-[length:100%_100%] bg-hero-pattern">
        <Particles className='particles-js h-full w-full absolute' options={particlesConfig} />
        <div className="header-4-1 absolute top-[20vh] z-100">
          <div className='w-screen'>
            <div className="mx-auto flex pt-12 pb-16 lg:pb-20 lg:px-24 md:px-16 sm:px-8 px-8 lg:flex-row flex-col">
              <div
                className="lg:flex-grow lg:w-1/2 flex flex-col lg:items-start lg:text-left mb-3 md:mb-12 lg:mb-0 items-center text-center">
                <p className="mb-8 text-medium text-white">
                  We can build a <span  ref={typedRef} className="font-semibold"></span>
                </p>
                <h1 className="text-white sm:text-4xl lg:text-5xl text-2xl mb-8 font-semibold sm:leading-tight">
                  Empower your business journey with us.
                </h1>
                <div
                  className="inline-block items-center mx-auto lg:mx-0 lg:flex justify-center lg:mt-12 lg:space-x-12 md:space-x-2 sm:space-x-3 space-x-0">
                  <a
                     href={'https://bit.ly/contact-bismit'} className="z-10 btn-fill bg-white inline-flex font-semibold text-orange-500 text-base py-4 px-6 rounded-xl mb-4 lg:mb-0 md:mb-0 focus:outline-none hover:shadow-lg">
                    Get Started
                  </a>
                </div>
              </div>
              <div className="w-full lg:w-1/2 text-center lg:justify-end justify-center flex pr-0">
                <img id="hero" className='w-[20em] h-[20em] lg:w-fit lg:h-fit'
                  src="assets/image/il_jet.svg"
                  alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='service' className="h-full w-full border-box bg-white">

		<div className="our-service">
			<div className="scroll-trigger-benefit container lg:px-32 md:px-8 sm:px-12 px-5 pt-20 pb-12 mx-auto">
				<div className="flex flex-col text-center w-full mb-12">
					<h1 className="text-4xl font-semibold title-font mb-2.5 text-medium-black">
						3 Keys Benefit
					</h1>
					<h2
						className="text-base font-light title-font mx-12 lg:w-full md:w-full sm:w-3/6 sm:mx-auto text-medium-black">
						Benefit yang anda dapatkan dari layanan kami
					</h2>
				</div>

				<div ref={refBenefit} className="flex lg:flex-row flex-col -m-4">
					<div className="px-14 md:px-0 lg:px-4 lg:w-1/3 md:w-1/3 sm:w-4/6 mx-auto">
						<div className="flex rounded-lg h-full lg:pt-8 lg:pb-8 md:pt-8 md:pb-8 pt-4 pb-12 flex-col">
							<div className="items-center text-center">
								<div className="inline-flex items-center justify-center rounded-full mb-6">
									<img src={'/icons/chat_service.png'}
										alt="Consultation" />
								</div>
							</div>
							<div className="flex-grow">
								<h4 className="font-medium text-center text-2xl mb-2.5 text-medium-black">
								Free Consultation
								</h4>
								<p className="leading-relaxed text-base text-center tracking-wide text-gray">
									Gratis konsultasi terkait <br />kebutuhan bisnismu
								</p>
							</div>
						</div>
					</div>
					<div className="px-14 md:px-0 lg:px-4 lg:w-1/3 md:w-1/3 sm:w-4/6 mx-auto">
						<div className="flex rounded-lg h-full lg:pt-8 lg:pb-8 md:pt-8 md:pb-8 pt-12 pb-12 flex-col">
							<div className="items-center text-center">
								<div className="inline-flex items-center justify-center rounded-full mb-6">
									<img src={'/icons/efficient_service.png'}
										alt="Efficient" />
								</div>
							</div>
							<div className="flex-grow">
								<h4 className="font-medium text-center text-2xl mb-2.5 text-medium-black">
									Efficient & Effective
								</h4>
								<p className="leading-relaxed text-base text-center tracking-wide text-gray">
									Mengutamakan tujuan yang <br />ingin dicapai customer
								</p>
							</div>
						</div>
					</div>
					<div className="px-14 md:px-0 lg:px-4 lg:w-1/3 md:w-1/3 sm:w-4/6 mx-auto">
						<div className="flex rounded-lg h-full lg:pt-8 lg:pb-8 md:pt-8 md:pb-8 pt-12 pb-6 flex-col">
							<div className="items-center text-center">
								<div className="inline-flex items-center justify-center rounded-full mb-6">
									<img src={'/icons/trusted_service.png'}
										alt="Trusted" />
								</div>
							</div>
							<div className="flex-grow">
								<h4 className="font-medium text-center text-2xl mb-2.5 text-medium-black">
									Professional 
								</h4>
								<p className="leading-relaxed text-base text-center tracking-wide text-gray">
									Mengutamakan kepuasan customer <br />dengan memberikan	 hasil yang berkualitas
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			
		</div>
	</section>

  <section className="h-full w-full border-box ">
		<div className="scroll-trigger our-service">
			<div className="container lg:px-20 md:px-8 sm:px-12 px-5 pt-20 pb-12 mx-auto">
				<div className="flex flex-col text-center w-full mb-12">
					<h1 className="text-4xl font-semibold title-font mb-2.5 text-medium-black">
						What We Can do
					</h1>
				</div>	

				<div ref={refService} className="flex w-full flex-wrap md:justify-between md:gap-5 md:flex-row box-border flex-col my-4">
					{categoriesProject.length>0? categoriesProject.map((project,index)=>(
						<div key={index} className="card px-4 md:w-[47%] md:px-4 lg:px-4 xl:w-1/5 my-4 md:my-0 md:mx-0 mx-4">
							<div className="flex rounded-lg h-full lg:pt-8 lg:pb-8 md:pt-8 md:pb-8 pt-12 pb-6 flex-col">
								<div className="items-center text-start">
									<div className="inline-flex items-center justify-center rounded-full mb-6">
										<img src="assets/image/icon_service.svg"
											alt="" />
									</div>
								</div>
								<div className="flex-grow">
									<h4 className="font-medium text-start text-lg mb-2.5 text-medium-black">
										{project.categories}
									</h4>
									<p className="leading-relaxed tracking-wide text-sm text-start text-gray-500">
										 {project.desc.length > 85
											? project.desc.slice(0, 85) + "..."
											:project.desc
										  }
									</p>
								</div>
							</div>
						</div>
					))
					: null}
				</div>
			</div>
		</div>
	</section>
	<section id='portofolio' className="h-full border-box bg-white ">
		<div className="our-service">
			<div className='flex flex-col items-center bg-salmon-400 w-full h-fit px-3 py-10 '>
				<div className="scroll-trigger-portofolio container lg:px-32 md:px-8 sm:px-12 px-5 pt-20 pb-12 mx-auto flex flex-col gap-5">
					<div className="flex flex-col text-center w-full mb-5">
						<h1 className="text-4xl font-semibold title-font mb-2.5 text-medium-black">
							Our Portofolio
						</h1>
					</div>
						<Tabs >
							<div className='w-full h-fit overflow-hidden text-center'>
								<TabList >
									{categoriesProject.length>0? categoriesProject.map((project,index)=>{
										if(project.portofolios.length>0){
											return(
												<Tab key={index} onClick={()=>setTimeout(()=>tabClicked(),10)}>{project.categories}</Tab>
											)
										}
									}):null}
								</TabList>
							</div>
							{categoriesProject.length>0? categoriesProject.map((project,index)=>{
								if(project.portofolios.length>0){
									return(
										<TabPanel key={index} className={"w-full"}>
											<div ref={refPortofolio} className="flex lg:gap-10 md:flex-row flex-col  justify-between flex-wrap box-content">
												{portofolios.length>0? portofolios.map((portofolio,indexPorto)=>{
													if(portofolio.categories_project.categories == project.categories){
														return(
															<>
																<div key={indexPorto} className="card px-4 md:px-4 lg:px-4 md:w-[47%] my-4">
																	<div className="flex rounded-lg h-full lg:pt-8 lg:pb-8 md:pt-8 md:pb-8 pt-12 pb-6 flex-col">
																		<div className="flex-grow">
																			<h4 className="font-medium text-start text-lg mb-2.5 text-medium-black">
																				{portofolio.judul_project}
																			</h4>
																			<p className="leading-relaxed tracking-wide text-sm text-start text-gray-500">
																				{portofolio.desc}
																			</p>
																		</div>
																		<div className="items-center text-center">
																			<div className="inline-flex items-center justify-center rounded-full mb-6">
																				{portofolio.gambar?(
																				<Image src={`${API_URL}${portofolio.gambar.url}`}
																					alt={portofolio.judul_project} width={portofolio.gambar.width} height={portofolio.gambar.height} />
																					):(
																						<p>There is no picture</p>
																					)}
																			</div>
																		</div>
																			<a href={portofolio.url} className="text-sm text-end text-orange-500 hover:cursor-pointer">
																				View More
																			</a>
																	</div>
																</div>							
															</>
														)
													}
												}
												):null}
											</div>
										</TabPanel>	
									)
								}
							}
								
							):null}
							
					</Tabs>
				</div>
			</div>
		</div>
	</section>
  <section id='testimonials' className="scroll-trigger-testimonials h-full w-full border-box bg-white">
		<div ref={refTestimonials} className="testimonials">
			<div className="container lg:px-32 md:px-8 sm:px-12 px-5 pt-20 pb-12 mx-auto">
				<div className="flex flex-col text-center w-full mb-12">
					<h1 className="text-4xl font-semibold title-font mb-2.5 text-medium-black">
						Testimonials
					</h1>
					<h2
						className="text-base font-light title-font mx-12 lg:w-full md:w-full sm:w-3/6 sm:mx-auto text-medium-black">
						Apa kata mereka terkait layanan kami
					</h2>
				</div>
				<Carousel className='flex gap-4' responsive={responsive} containerClass="carousel-container" itemClass="carousel-item-gap" autoPlay={true} autoPlaySpeed={3000} arrows={false} showDots={true} infinite={true} swipeable={true} dotListClass="custom-dot-list-style">
					{testimonials.length>0? testimonials.map((testimoni,index)=>(
						<div key={index} className="testimonial-content  py-4 px-9 h-[15rem] border-2 box-border border-orange-500 rounded-xl flex flex-col justify-evenly items-center gap-4">
							<div className='h-[70%] flex items-center box-border'>
								<p className="testimonial-text text-gray-800 text-[.7em]">{testimoni.desc.length > 200
                                ? testimoni.desc.slice(0, 200) + "..."
                                : testimoni.desc}</p>
							</div>
							<figure className='flex h-[30%] justify-center items-center gap-3 w-full'>
								<div className=' w-[30%] flex justify-center'>
									{testimoni.gambar ? (
									<Image className='rounded-full overflow-hidden' src={`${API_URL}${testimoni.gambar.url}`} width={60} height={60} alt='Avatar'/>
									):(
										<p>There is no pictures</p>
									)}
									</div>
								<figcaption className='w-[70%] h-full flex flex-col items-start justify-center pb-3'>
									<p className="testimonial-author text-black text-[.8em] font-bold">{nameHandler(testimoni.name)}</p>
									<p className="testimonial-author text-slate-500 text-[.8em] font-bold">{testimoni.job}</p>
								</figcaption>
							</figure>
						</div>
					)):null}
				</Carousel>
				
      

			</div>

		
		</div>
	</section>
  </>
  )
}

interface ServerSideData{
    categoriesProject : CategoriesProjects[],
	portofolios : Portofolios[],
	testimonials: Testimonials[]
}
export const getServerSideProps: GetServerSideProps<ServerSideData> = async (
  ) => {
  const CategoriesProjects = await (await fetch(`${API_URL}/categories-projects`)).json();
  const portofolios = await (await fetch(`${API_URL}/portofolios`)).json();
  const testimonials= await (await fetch(`${API_URL}/testimonials`)).json();
  
  return{
    props:{
        categoriesProject:CategoriesProjects,
		portofolios,
		testimonials
    }
  }
}

export default Index;