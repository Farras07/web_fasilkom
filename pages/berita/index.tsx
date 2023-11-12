import React, { useRef, useState,useEffect } from "react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import styles from "../../styles/SemuaBerita.module.scss";
import { DetailBerita } from "../../constants/types";
import { API_URL } from "../../constants";
import Link from "next/link";
import * as dateFns from "date-fns";
import { DocumentHead } from "../../components/DocumentHead";
import { useDispatch } from 'react-redux'
import { setStatePageVisit } from '../../store/pageVisitSlices'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

const Berita: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> =
  (props) => {
    const dispatch = useDispatch()
    const refSection = useRef<HTMLInputElement>(null)
    const { listBerita, beritaCount } = props;
    const paginationStart = useRef(listBerita.length);
    const [beritaList, setBeritaList] = useState(listBerita);
    const [isFetchingNewData, setIsFetchingNewData] = useState(false);
    
    useEffect(()=>{
      dispatch(setStatePageVisit({page:'Berita'}))
      const animation=gsap.fromTo(refSection.current,{ autoAlpha: 0, y: 400 },
        { autoAlpha: 1, duration: 1, y: 0, ease: 'power3.out', animationDuration: 1 })
      
      ScrollTrigger.create({
        animation: animation,
        trigger: refSection.current,
        start: 'top-=500px center',
        end: 'bottom center',
      })
    },[dispatch])
    

    return (
      <>
        <DocumentHead pageTitle="Fasilkom News" />
        <div className={styles.container}>
          <h1 className={styles.textberita}>Fasilkom News</h1>
          {beritaList.length > 0 ? (
            <>
              <div ref={refSection} className={styles.berita_list_container}>
                {beritaList.map((berita, idx) => {
                  return (
                    <Link  key={idx} href={`/berita/${berita.id}`} passHref>
                      <a  className={styles.news_card}>
                        <div className={styles.news_thumbnail}>
                          <img src={berita.cover ? API_URL + berita.cover.url : 'placeholder_image_url'} alt="berita" />
                        </div>
                        <div className="flex w-full h-fit justify-between items-center font-light">
                        
                        <p className={styles.news_date}>
                          <img className="inline w-[24px] h-[24px] mr-1 m-auto" width={24} height={24} alt="date" src="icons/date.svg"/>
                          {dateFns.format(
                            new Date(berita.created_at),
                            "d MMMM yyyy"
                          )}
                        </p>
                        <p className="text-[12px]">
                        <img className="inline w-[24px] h-[24px] mr-1" width={24} height={24} alt="date" src="icons/user.svg"/>
                          {berita.author.firstname}
                        </p>
                        </div>
                        <h3 className={styles.news_title}>{berita.judul}</h3>
              
                        <p className={styles.news_desc}>
                          {berita.pratinjau.length > 200
                            ? berita.pratinjau.slice(0, 200) + "..."
                            : berita.pratinjau}
                        </p>
                      </a>
                    </Link>
                  );
                })}
              </div>
              {beritaList.length < beritaCount ? (
               <button
               className={styles.news_load_more}
               disabled={isFetchingNewData}
               onClick={() => {
                 setIsFetchingNewData(true);
                 fetch(`${API_URL}/beritas?_sort=created_at:DESC&_start=${paginationStart.current}&_limit=3`)
                   .then((res) => {
                     if (!res.ok) {
                       throw new Error('Network response was not ok');
                     }
                     return res.json();
                   })
                   .then((newNews) => {
                     setBeritaList( [...beritaList, ...newNews]);
                     setIsFetchingNewData(false);
                   })
                   .catch((error) => {
                     setIsFetchingNewData(false);
                   });
               }}
             >
               <p className="border border-black">
                 {isFetchingNewData ? "Mengambil data" : "Lihat lebih banyak"}{' '}
                 <img className="inline ml-1 mb-1 rotate-[90deg]" width={20} height={20} src="icons/arrowRight.svg" alt="arrow" />
               </p>
             </button>
             
              ) : null}
            </>
          ) : (
            <div className={styles.no_news_notice}>
              <h1>Ups, belum ada berita di sini</h1>
            </div>
          )}
        </div>
      </>
    );
  };

type ServerSideData = {
  listBerita: DetailBerita[];
  beritaCount: number;
};

export const getServerSideProps: GetServerSideProps<ServerSideData> =
  async () => {
    const [beritaList, beritaCount] = await Promise.all([
      await (
        await fetch(
          `${API_URL}/beritas?_sort=created_at:DESC&_start=0&_limit=6`
        )
      ).json(),
      await (await fetch(`${API_URL}/beritas/count`)).json(),
    ]);


    return {
      props: {
        listBerita: beritaList,
        beritaCount,
      },
    };
  };

export default Berita;
