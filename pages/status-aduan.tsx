import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import styles from "../styles/StatusAduan.module.scss";
import {  signOut, getSession } from "next-auth/client";
import { API_URL } from "../constants";
import { AspirasiDanAduan, StatusAduan } from "../constants/types";
import { useReducer, useRef,useState,useEffect } from "react";
import { useRouter } from "next/router";
import { Session } from "next-auth";
import * as dateFns from "date-fns";
import { DocumentHead } from "../components/DocumentHead";
import { useDispatch } from 'react-redux'
import { setStatePageVisit } from '../store/pageVisitSlices'
const StatusAduanPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const dispatch = useDispatch()
  dispatch(setStatePageVisit({page:'status-aduan'}))
  const { columns,session } = props;
  const router = useRouter()
  const [status,setStatus]= useState(0)
  const [allAduans,setAllAduans]= useState(columns)
  useEffect(()=>{
    if(!session){
      router.push('/')
    }
  },[])
  const initialLanesOffset: Record<number, number> = {};

  columns.lanes.forEach((lane) => {
    initialLanesOffset[lane.id] = lane.cards.length;
  });

  const offsets = useRef(initialLanesOffset);
  const shouldFetchNewData = useRef(true);
  const [listAduan, updateListAduan] = useReducer(listAduanReducer, columns);

  function listAduanReducer(
    prevState: typeof columns,
    payload: {
      newAduans: { id: number; title: string; description: string, pesan:string,tipe:string,showDetail:boolean }[];
      laneId: number;
    }
  ): typeof columns {
    if (payload.newAduans.length === 0) {
      shouldFetchNewData.current = false;
      return prevState;
    }

    const prevStateClone: typeof prevState = JSON.parse(
      JSON.stringify(prevState)
    );

    const currentLaneIdx = prevStateClone.lanes.findIndex((lane) => {
      return lane.id === payload.laneId;
    });

    if (currentLaneIdx === -1) return prevState;

    payload.newAduans.forEach((newAduan) => {
      prevStateClone.lanes[currentLaneIdx].cards.push(newAduan);
    });

    const currentOffsets = offsets.current;
    currentOffsets[payload.laneId] = currentOffsets[payload.laneId] + 5;
    offsets.current = currentOffsets;

    return prevStateClone;
  }

  const [show,setShowDetail]=useState(false);
  const showDetail = (id:number,status:number)=>{

    const updatedAllAduans = { ...allAduans };
      
    const foundedCard:any = allAduans.lanes[status].cards.findIndex((card)=>
      card.id === id
    )

   
      const updatedCard = {
      ...updatedAllAduans.lanes[status].cards[foundedCard],
      showDetail: !updatedAllAduans.lanes[status].cards[foundedCard].showDetail,
    
      }

      updatedAllAduans.lanes[status].cards[foundedCard] = updatedCard;

      // Update the state with the modified allAduans object
      setAllAduans(updatedAllAduans);


  }

  

  const back = () =>{
      router.push('/aduan-dan-aspirasi')
  }


  return (
    <>
      <DocumentHead pageTitle="Status Aduan" />
      {!session? null : 
      <div className={styles.container}>
        <header className={styles.title}>
          <h1 className={styles.title_main}>Status Aduan</h1>
          <p className={styles.title_sub}>
            Lihat status aduan dan aspirasi <br className={styles.enter} />
            KM FASILKOM di bawah ini
          </p>
        </header>
        <div className={styles.kanban_wrapper}>
          {/* <Board
            style={{ backgroundColor: "#ddd", padding: 40 }}
            data={listAduan}
            draggable={false}
            editable={false}
            cardDraggable={false}
            hideCardDeleteIcon
            onLaneScroll={async (_requestedPage, laneId) => {
              if (!shouldFetchNewData.current) return [];

              fetch(
                `${API_URL}/aspirasi-dan-aduans?_sort=created_at:DESC&_start=${offsets.current[laneId]}&_limit=5&status_aduan_eq=${laneId}`
              ).then((res) => {
                res.json().then((newAduans: AspirasiDanAduan[]) => {
                  const newAduanArray = newAduans.map((aduan) => {
                    return {
                      id: aduan.id,
                      title: `${aduan.tipe} dari ${aduan.nama}`,
                      description: dateFns.format(
                        new Date(aduan.created_at),
                        "d MMMM yyyy - HH:mm"
                      ),
                    };
                  });

                  updateListAduan({ laneId, newAduans: newAduanArray });
                });
              });

              return [];
            }}
          /> */}
          {}
        </div>
        <div className="min-w-[360px] ">
          <div className="w-full h-fit border-b-2 shadow shadow-gray-400 border-[#FEAB6C]">
            <ul className="w-full h-full text-center  flex text-[12px] justify-evenly  py-2">
              <li className={`text-[#094379] w-[calc(100%/3)]  text-[1.3em] sm:text-[1.5em] md:text-[1.6em]  hover:font-bold cursor-pointer`} onClick={()=>setStatus(0)}><a className={` ${status === 0 ? 'font-bold  text-[#FEAB6C]':null}`}>Dalam Antrian</a></li>
              <li className="text-[#094379] w-[calc(100%/3)]  hover:text-[#FEAB6C] text-[1.3em] sm:text-[1.5em] md:text-[1.6em] active:font-bold hover:font-bold cursor-pointer" onClick={()=>setStatus(1)}><a className={` ${status === 1 ? 'font-bold  text-[#FEAB6C]':null}`}>Dilaporkan</a></li>
            </ul>
          </div>
          <div className="w-full h-[555px] pt-10 pb-5 overflow-y-scroll lg:grid lg:grid-cols-3 lg:grid-rows-auto gap-2">
            {
              
                   allAduans.lanes[status].cards.map((aduan) => {
                    return(
                    <article key={aduan.id} className="w-[90%] mb-5 lg:mb-0 border-2 border-[#FEAB6C] h-fit p-2 rounded-[10px] mx-auto hover:bg-[#FEAB6C] hover:border-none transition-all hover:bg-opacity-[25%] ">
                    <h1 className="text-[#094379] font-semibold text-[19px] sm:text-[24px] lg:text-[18px]">{`${aduan.title}`}</h1>
                    <p className="text-[15px] sm:text-[13px] text-gray-500">{aduan.description}</p>
                    <p className="text-gray-800 font-semibold text-[0.9em]">Tipe : {aduan.tipe}</p>
                    <button className="underline text-[#FEAB6C] text-[0.9em] mt-1" onClick={()=>showDetail(aduan.id,status)}>Tampilkan Isi {aduan.tipe}</button>
                    {aduan.showDetail?
                    <div className="w-full h-fit mt-2 bg-[#FEAB6C] rounded-[10px] p-2 opacity-[0.8]">
                    <p>{aduan.pesan}</p>
                    </div>
                     :
                     null
                    }
                   </article>
                  
                    )
                  })
               
              
            }
          

          </div>
          <button onClick={()=>signOut({
                callbackUrl: `/aduan-dan-aspirasi`,
              })} className="h-fit w-fit rounded-full border border-slate-200 text-white bg-red-600 p-2 px-5 shadow shadow-gray-500 hover:bg-white hover:border-red-600 hover:border-2 hover:font-bold hover:scale-[1.02] hover:text-red-600  mx-auto block ">Log-Out</button>
         <button onClick={()=>back()} className='mx-auto block border-2 border-[#FEAB6C] rounded-[10px] py-2 px-5 mt-5 hover:scale-[1.1] transition-all' >Kembali</button>
        </div>
      </div>
      }
    </>
  );
};
type sessionType = {
  user:{
    name:string,
    email:string,
    image:string
  }
  expires:string
}

type ServerSideData = {
  listAduan?: AspirasiDanAduan[];
  listStatusAduan?: StatusAduan[];
  columns: {
    lanes: {
      id: number;
      title: string;
      cards: {
        id: number;
        title: string;
        description: string;
        pesan:string;
        tipe:string;
        showDetail:boolean;
      }[];
    }[];
  };
  session?: Session | null; // Include session property in the type definition
};


export const getServerSideProps: GetServerSideProps<ServerSideData> =
  async (context) => {
    const session = await getSession(context);
    let listStatusAduan = (await (
      await fetch(`${API_URL}/status-aduans`)
    ).json()) as StatusAduan[];

    listStatusAduan.sort(
      (statusAduan1, statusAduan2) => statusAduan1.urutan - statusAduan2.urutan
    );

    const columns = {
      lanes: await Promise.all(
        listStatusAduan.map(async (statusAduan) => {
          const cards = (await (
            await fetch(
              `${API_URL}/aspirasi-dan-aduans?_sort=created_at:DESC&_start=0&_limit=7&status_aduan_eq=${statusAduan.id}`
            )
          ).json()) as AspirasiDanAduan[];

          return {
            id: statusAduan.id,
            title: statusAduan.status,
            cards: cards.map((aduan) => {
              return {
                id: aduan.id,
                title: `${aduan.tipe} dari ${aduan.nama}`,
                pesan:aduan.pesan,
                tipe:aduan.tipe,
                showDetail:false,
                description: dateFns.format(
                  new Date(aduan.created_at),
                  "d MMMM yyyy - HH:mm"
                ),
              };
            }),
          };
        })
      ),
    };

    return { props: { columns,listStatusAduan, session } };
  };

export default StatusAduanPage;
