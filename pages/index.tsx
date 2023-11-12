import React,{useRef,useEffect} from 'react'
import About from '../components/About/home'
import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
  } from "next";
import { DetailBerita } from "../constants/types";
import {  HomepageContent } from "../constants/types";
import { API_URL } from "../constants";
import News from '../components/News'
import { Pengurus } from '../constants/types';
import Jumbotron from '../components/Jumbotron'
import Sambutan from '../components/Sambutan'
import { DocumentHead } from '../components/DocumentHead'
import { useDispatch } from 'react-redux'
import { setStatePageVisit } from '../store/pageVisitSlices'

const Index : NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const dispatch = useDispatch()
  const { HomepageContent, listBerita, namaKabinet,sambutan,pengurus} = props
  const BPH= {
    ketuaUmum : pengurus.filter(person => person.jabatan.nama === 'Ketua BEM')[0],
    wakilKetua :pengurus.filter(person => person.jabatan.nama === 'Wakil Ketua BEM')[0]
  }
  useEffect(()=>{
    dispatch(setStatePageVisit({page:'Homepage'}))
  },[dispatch])
//   useLayoutEffect(() => {
//     let scroll: any = null;
//     import("locomotive-scroll").then((locomotiveModule) => {
//         scroll = new locomotiveModule.default({
//           el: useRefScroll.current,
//           smooth: true,
//             resetNativeScroll: true
//         });
//       });
//       return () => scroll? scroll.destroy():null
// },[]);
  
  return (
    <>
      <DocumentHead pageTitle="Homepage" />
      <section className='w-screen box-border min-w-[360px]'>
          <section className='px-10'> 
              <Jumbotron namaKabinet={namaKabinet} />
              <Sambutan content={sambutan} BPH={BPH}/>
              <About HomepageContent={HomepageContent} />
              <News listBerita={listBerita}/>
          </section>
      </section>
    </>
  )
}
type ServerSideData = {
    HomepageContent:  HomepageContent,
    listBerita: DetailBerita[],
    namaKabinet:string,
    sambutan:string,
    pengurus:Pengurus[],
  };

export const getServerSideProps: GetServerSideProps<ServerSideData> =
  async () => {
    // const [beritaList, beritaCount] = await Promise.all([
    //   await (
    //     await fetch(
    //       `${API_URL}/beritas?_sort=created_at:DESC&_start=0&_limit=6`
    //     )
    //   ).json(),
    //   await (await fetch(`${API_URL}/beritas/count`)).json(),
    // ]);
    const homepageContent = await (await fetch(`${API_URL}/homepage`)).json()
    const kabinet = await (await fetch(`${API_URL}/nama-kabinet`)).json()
    const sambutan = await (await fetch(`${API_URL}/sambutan`)).json()
    const beritaList = await (await fetch(`${API_URL}/beritas?_sort=created_at:DESC&_start=0&_limit=3`)).json()
    const pengurus = await (await fetch(`${API_URL}/penguruses`)).json();


    const {nama:namaKabinet} = kabinet
    const sambutanContent = sambutan.content
    return {
      props: {
        HomepageContent:homepageContent,
        listBerita: beritaList,
        namaKabinet,
        sambutan: sambutanContent,
        pengurus
      },
    };
  };

export default Index