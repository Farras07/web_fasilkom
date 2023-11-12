import React, {useState,useEffect,useRef} from 'react'
import Image from 'next/image'
import 'react-multi-carousel/lib/styles.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Card from '../../components/strukturOrganisasi/cardAnggota'
import Proker from '../../components/Assets/Proker'
import {useDispatch } from 'react-redux'
import { setStatePageVisit } from '../../store/pageVisitSlices'
import {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
  } from "next";
import { API_URL } from "../../constants";
import { DocumentHead } from "../../components/DocumentHead";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Pengurus, Proker as Prokers, StrukturOrganisasiPage, Tupoksi } from '../../constants/types';
gsap.registerPlugin(ScrollTrigger)

const StrukturOrganisasi: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {

    const {namaKabinet,logo,strukturOrganisasi,pengurus,prokers,tupoksis} =props

const groupingData = (key:string)=>{
    const keyData = pengurus
  .filter(item => item[key]) // Filter only items with "key" key
  .map(item => item[key])   // Extract "key" objects
  .reduce((acc, curr) => {
    // Group by "nama" and accumulate in an array
    const key = curr.nama;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(curr);
    return acc;
  }, {});

// Convert grouped data to an array of objects
const groupedKeyArray = Object.keys(keyData).map(nama => ({
  nama,
  items: keyData[nama],
}));

return groupedKeyArray

}
const groupedByAnggotaJurusan = (pengurus:Pengurus[], prokers:Prokers[], tupoksis:Tupoksi[]) => {
    // Create a map to store the prokers grouped by divisi ID
    const prokersByDivisi: { [divisiId: string]: Prokers[] } = {};
    const tupoksisByDivisi : { [divisiId : string] :Tupoksi[]}={}
  
    // Group prokers by divisi ID
    prokers.forEach((proker) => {
      const divisiId = proker.divisi_pengurus;
      if (!prokersByDivisi[divisiId]) {
        prokersByDivisi[divisiId] = [];
      }
      prokersByDivisi[divisiId].push(proker);
    });

    tupoksis.forEach((tupoksi) => {
      const divisiId = tupoksi.divisi_pengurus;
      if (!tupoksisByDivisi[divisiId]) {
        tupoksisByDivisi[divisiId] = [];
      }
      tupoksisByDivisi[divisiId].push(tupoksi);
    });
  
    // Create an object to store the grouped data
    const groupedData: {[divisiName : string ]:StrukturOrganisasiPage} = {};
  
    // Iterate through the data and group by "divisi.nama"
    pengurus.forEach((item) => {
      if (item.divisi && item.divisi.nama) {
        const divisiName = item.divisi.nama;
        if (!groupedData[divisiName]) {
          // Initialize the group with divisi ID, nama, and prokers
          groupedData[divisiName] = {
            id: item.divisi.id, // Add divisi ID
            divisi: divisiName,
            members: [],
            prokers: prokersByDivisi[item.divisi.id] || [], // Assign prokers based on divisi ID
            tupoksis: tupoksisByDivisi[item.divisi.id] || [], // Assign prokers based on divisi ID
          
           };
        }
  
        // Extract the desired fields and add to the group
        groupedData[divisiName].members.push({
            id: item.id,
            nama: item.nama,
            jabatan: item.jabatan,
            jurusan: item.jurusan,
            angkatan: item.angkatan,
            linkedin: item.linkedin,
            fotoUrl: item.foto.url,
            instagram: '',
            divisi: {
                id: '',
                nama: ''
            },
            foto: {
              height: 0,
              width: 0,
              url: '',
              formats: {
                thumbnail: {
                  url: ''
                }
              }
            }
        });
      }
    });
  
    // Convert the grouped data to an array
    const groupedArray = Object.values(groupedData);
  
    return groupedArray;
  };

  
   
    const [data] = useState({
        namaKabinet:namaKabinet,
        logo:logo,
        strukturOrganisasi:strukturOrganisasi,
        pengurus:groupedByAnggotaJurusan(pengurus,prokers,tupoksis),
        divisi: groupingData('divisi'),
      
    })
    const dispatch = useDispatch()
    const refStruktur = useRef<HTMLInputElement>(null)
    const refImage = useRef<HTMLInputElement>(null)
    

    const tabClicked =()=>{
        gsap.fromTo(refImage.current,{autoAlpha:0,y:200,scale:.5},
            {autoAlpha:1,y:0,scale:1,ease:'power3.out',animationDuration:1})
    }
    useEffect(()=>{
        dispatch(setStatePageVisit({page:'Struktur Organisasi'}))
        const animation = {
            strukturOrganisasi: gsap.fromTo(refStruktur.current,{autoAlpha:0,y:200,scale:.5},
                {autoAlpha:1,y:0,scale:1,ease:'power3.out',animationDuration:1}),
        }

        ScrollTrigger.create({
            animation:animation.strukturOrganisasi,
            trigger:refStruktur.current,
            start:'top-=300px center',
            end:'bottom center',
            markers:false
        })
    },[dispatch])
    
  return (
    <>
        <DocumentHead pageTitle="Struktur Organisasi" />
        <section className='mt-[13vh] py-3'>
            <section className='w-full h-fit'>
                <section className='px-10 flex flex-col items-center justify-center md:flex-row md:justify-between w-full h-fit gap-5'>
                    <div  className='hidden md:block md:relative w-[8rem] h-[8rem] md:top-10  animate-spin-cust '>
                        <img src='/vector/vector.svg' width={200} height={200} alt='Kabinet Aerial'/>
                    </div>
                    <div className='text-center'>
                        <h3 className='text-2xl lg:text-3xl font-bold submenu w-fit'>Struktur Organisasi</h3>
                        <h4 className='text-lg lg:text-2xl tracking-wide font-black text-outline'>{data.namaKabinet}</h4>
                    </div>
                    <div className='flex justify-center h-[20vh] w- sm:h-[30vh] md:h-[7rem] md:relative md:top-10 lg:right-10'>
                        <img src={`${API_URL}${data.logo}`} width={150} height={150} alt='Kabinet Aerial' />
                    </div>
                </section>
                <section ref={refStruktur} className='relative flex justify-start lg:justify-center items-start flex-wrap px-3 md:px-7 w-full h-fit border-box '>
                    <img  src={`${API_URL}${data.strukturOrganisasi}`} width={1000} height={500} alt='Struktur Organisasi' />
                    <div className='absolute z-100 -bottom-20 lg:left-3'>
                        <Image src={'/vector/infinity.png'} width={150} height={150} alt='infinity'></Image>
                    </div>
                </section>
            </section>
            <section className='flex flex-col gap-5 px-3 sm:px-10'>
                <div className='flex flex-col gap-1'>
                    <h5 className='text-lg leading-none sm:text-xl md:text-2xl lg:text-3xl font-bold submenu w-fit pr-2 border-r-2 border-tangerine h-fit'>Fungsionaris</h5>
                    <h6 className='text-xs sm:text-sm md:text-base md:leading-3 lg:text-2xl font-black text-outline'>BEM FASILKOM 2023</h6>
                </div>
                <div className='w-full h-fit overflow-hidden'>
                    <Tabs>
                        <TabList>
                                {data.pengurus.map((p,i)=>{
                                    return(
                                <Tab onClick={()=>setTimeout(()=>tabClicked(),10)} key={i}>{p.divisi}</Tab>
                                    )
                                    
                                })}
                                
                                
                        </TabList>

                        
                        <div className='flex flex-col items-center bg-[#EFEFEF] w-full h-fit px-3 py-10 pb-[7rem]'>
                        {data.pengurus.map((p ,i)=>{
                            return(

                        <TabPanel key={i}>
                                <h4 className='text-2xl text-center font-bold text-typedBlue mb-10'>{p.divisi}</h4>
                                <div ref={refImage} className='flex flex-col  min-[730px]:flex-row lg:h-[10%] lg:flex-row gap-4 w-full justify-center items-center'>
                                                                    {p.members.map(m=>{return(
                                    <Card key={m.id} nama={m.nama}
                                    angkatan={m.angkatan} 
                                    jabatan={m.jabatan.nama} 
                                    jurusan={m.jurusan.nama}
                                    foto={m.fotoUrl}
                                    linkedin={m.linkedin}/>
                                    )})}
                                
                                    {/* <Card nama={'Muhammad Fauzan Novriandy sdnsjdn'}/> */}
                                </div>
                            
                                <div className='w-full h-fit flex flex-col lg:mt-10 lg:flex-row'>
                                {p.tupoksis.length?    
                                    <div className='flex flex-col w-full h-fit items-center justify-center mt-10'>
                                        <div className='w-full h-fit flex flex-col items-center gap-7'>
                                            <h6 className='text-2xl text-typedBlue font-bold'>Tupoksi</h6>
                                            <div className='px-5'>
                                                <ul className='list-disc'>
                                                    {p.tupoksis.map((t,i)=>
                                                    <li key={i} className='lg:text-sm'>{t.Tupoksi}</li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    null
                                }
                                {p.prokers.length ? 
                                    <div className='flex flex-col w-full h-fit items-center justify-center mt-10'>
                                        <div className='w-full h-fit flex flex-col items-center gap-7'>
                                            <h6 className='text-2xl text-typedBlue font-bold'>Proker</h6>
                                            <div className='h-fit w-full flex justify-around gap-3 flex-wrap box-border'>
                                            {prokers.map((prok) => {
                                            if (prok.divisi_pengurus === p.id) {
                                                return <Proker key={prok.id} prokerName={prok.nama} />;
                                            } else {
                                                return null;
                                            }
                                            })}
                                            
                                                
                                            </div>
                                        </div>
                                    </div>
                                
                                    :
                                    null
                                    }
                                </div>
                            </TabPanel>
                            
                            )
                        })}
                            
                        </div>
                    </Tabs>
                </div>
            </section>
        </section>
    </>
  )
}


interface ServerSideData{
    namaKabinet : string,
    logo: string,
    strukturOrganisasi:string,
    pengurus:Pengurus[],
    prokers:Prokers[],
    tupoksis:Tupoksi[]
    
    
}
export const getServerSideProps: GetServerSideProps<ServerSideData> = async (
  ) => {
    try {
      const namaKabinet = await (await fetch(`${API_URL}/nama-kabinet`)).json();
      const logo = await (await fetch(`${API_URL}/logo`)).json();
      const strukturOrganisasi = await (await fetch(`${API_URL}/bagan`)).json();
      const pengurus = await (await fetch(`${API_URL}/penguruses`)).json();
      const kategoriProkerResponse = await (await fetch(`${API_URL}/kategori-penguruses`)).json();
  
      const prokers = kategoriProkerResponse?.prokers?.length
        ? kategoriProkerResponse.prokers[0]
        : [];
  
      const tupoksis = kategoriProkerResponse?.tupoksis?.length
        ? kategoriProkerResponse.tupoksis[0]
        : [];
  
      return {
        props: {
          namaKabinet: namaKabinet?.nama || '',
          logo: logo?.logo?.url || '',
          strukturOrganisasi: strukturOrganisasi?.bagan?.url || '',
          pengurus: pengurus || [],
          prokers: prokers || [],
          tupoksis: tupoksis || [],
        },
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        notFound: true,
      };
    }


  }

  export default StrukturOrganisasi;