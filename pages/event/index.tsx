import React, { useRef, useState, useEffect } from "react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import styles from "../../styles/SemuaBerita.module.scss";
import { Event } from "../../constants/types";
import { API_URL } from "../../constants";
import Link from "next/link";
import Image from 'next/image'
import * as dateFns from "date-fns";
import { DocumentHead } from "../../components/DocumentHead";
import { useDispatch } from 'react-redux'
import { setStatePageVisit } from '../../store/pageVisitSlices'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)


const Events: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> =
  (props) => {
    const refSection = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    const { listEvents, EventsCount } = props;
    const paginationStart = useRef(listEvents.length);
    const [EventsList, setEventsList] = useState(listEvents);
    const [isFetchingNewData, setIsFetchingNewData] = useState(false);

    useEffect(()=>{
      dispatch(setStatePageVisit({page:'event'}))
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
        <DocumentHead pageTitle="Event" />
        <div className='w-screen h-fit px-20 mt-[16vh]'>
          <h3 className="text-center m-auto mb-10 font-bold text-typedBlue text-3xl submenu w-fit after:-bottom-2 after:-right-2 after:w-[100px]">Event</h3>
          {EventsList.length > 0 ? (
            <>
              <div ref={refSection} className='w-full flex justify-evenly flex-wrap gap-10 '>
                {EventsList.map((Events, idx) => {
                  return (
                      <a key={idx} href={Events.direct_link} target='_blank' rel="noreferrer" className='group card hover:translate-y-[-10px] transition-all overflow-hidden cursor-pointer bg-gradient-cust-orange2 hover:bg-none rounded-md border-2 bg-pastel pb-4 box-border drop-shadow p-[.1rem] w-fit min-[550px]:w-[80%] sm:max-w-none sm:w-[45%] lg:w-fit'>
                        <article className='w-fit lg:w-[20rem] flex flex-col flex-wrap lg:justify-center '>
                          <Image className='rounded-t-xl object-cover' width={300} height={180} src={API_URL + Events.event_image.url} alt="Events" />
                          <section className='px-2 py-2 flex flex-col gap-2'>
                            <h3 className='text-[1.2em] text-typedBlue font-bold text-center'>{Events.name}</h3>
                            <div className="">
                              <p className={`text-[.9em] font-bold tracking-wide text-tangerine`}>
                                  Start :  {dateFns.format(
                                  new Date(Events.start_date),
                                  "d MMMM yyyy"
                                )}
                              </p>
                              <p className={`text-[.9em] font-bold tracking-wide text-typedBlue`}>
                                End : {dateFns.format(
                                  new Date(Events.end_date),
                                  "d MMMM yyyy"
                                )}
                              </p>
                            </div>
                          </section>
                          
                          <p className='text-[.8em] px-2 text-justify'>
                            {Events.deskripsi.length > 200
                              ? Events.deskripsi.slice(0, 200) + "..."
                              : Events.deskripsi}
                          </p>
                        </article>
                      </a>
                  );
                })}
              </div>
              {EventsList.length < EventsCount ? (
                <button
                  className={styles.news_load_more}
                  disabled={isFetchingNewData}
                  onClick={() => {
                    setIsFetchingNewData(true);
                    fetch(
                      `${API_URL}/projects?_sort=created_at:DESC&_start=${paginationStart.current}&_limit=3`
                    ).then(async (res) => {
                      res.json().then((newNews) => {
                        setEventsList((prevState) => {
                          return [...prevState, ...newNews];
                        });
                        setIsFetchingNewData(false);
                      });
                    });
                  }}
                >
                  {isFetchingNewData ? "Mengambil data" : "Lihat lebih banyak"}
                </button>
              ) : null}
            </>
          ) : (
            <div className={styles.no_news_notice}>
              <h1>Ups, belum ada Event di sini</h1>
            </div>
          )}
        </div>
      </>
    );
  };

type ServerSideData = {
  listEvents: Event[];
  EventsCount: number;
};

export const getServerSideProps: GetServerSideProps<ServerSideData> =
  async () => {
    const [EventsList, EventsCount] = await Promise.all([
      await (
        await fetch(
          `${API_URL}/projects?_sort=created_at:DESC&_start=0&_limit=6`
        )
      ).json(),
      await (await fetch(`${API_URL}/projects/count`)).json(),
    ]);

    return {
      props: {
        listEvents: EventsList,
        EventsCount,
      },
    };
  };

export default Events;
