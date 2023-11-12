import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { Berita, DetailBerita } from "../../constants/types";
import styles from "../../styles/NewsDetail.module.scss";
import Error from "next/error";
import ReactMarkdown from "react-markdown";
import { API_URL } from "../../constants";
import { DocumentHead } from "../../components/DocumentHead";
import * as dateFns from "date-fns";
import {  useDispatch } from 'react-redux'
import { setStatePageVisit } from '../../store/pageVisitSlices'
import Link from "next/link";
import { useEffect } from "react";



const NewsPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(setStatePageVisit({page:'Berita'}))
  },[dispatch])
  
  // const { errorCode, detailBerita, listBerita } = props;

  // useDarkNavLinks();

  const { errorCode, detailBerita,listBerita } = props;
  if (errorCode || !detailBerita) {
    return (
      <Error
      statusCode={errorCode as number}
      title="Tidak dapat menemukan berita"
      />
      );
    }
    
    return (
      <>
      <DocumentHead pageTitle="Berita" />
      <main className={styles.main}>
        <div className="w-fit h-fit flex flex-col  lg:flex-row mt-3">
       <section className="lg:w-[70%]">
        <section className={styles["head-news"]}>
        <button className="w-[106px] h-[34px] rounded-[10px] bg-[#F2DECE] text-left mt-10 text-center flex items-center justify-center text-[#FA6D01]">
          <p>{detailBerita.category.category}</p>
        </button>
          {/* <div className={styles["border-shape"]}>
            <div className={styles["border-shape-inside"]}></div>
          </div> */}

          <h1 className={styles["news-title"]}>{detailBerita.judul}</h1>

          <p className={styles["news-info-date"]}>
             {dateFns.format(new Date(detailBerita.created_at), "d MMMM yyyy")}{" "}
             •
             By {detailBerita.author.firstname}
          </p>
          {/* <p className={styles["news-info-author"]}>
           
          </p> */}
        </section>

        <div className={styles["img-container"]}>
          <img src={`${API_URL}${detailBerita.cover.url}`} alt="" />
        </div>

        <article className={styles["news-content"]}>
          <ReactMarkdown transformImageUri={(src, alt, title) => API_URL + src}>
            {detailBerita.konten}
          </ReactMarkdown>
        </article>
        </section>

        <section className="  mt-10  sm:mt-[4em] lg:mt-9 w-[80%]  mx-auto lg:w-[30%] lg:p-2">
         <h1 className="font-[700] text-[19px] md:text-[24px] ml-auto md:mb-4 lg:mb-0">Artikel Terbaru</h1>
         <div className="w-full h-[250px] lg:h-fit overflow-y-scroll lg:overflow-y-visible flex flex-col"> 
          {listBerita.map((article, i)  => (
            
              <>
              <Link key={i} href={`/berita/${article.id}`} passHref>
               <article className="flex w-[100%] mx-auto mt-3 h-fit cursor-pointer ">
          <img className="h-[65px] w-[65px] md:h-[120px] object-fit md:w-[120px] lg:w-[65px] lg:h-[65px]  bg-slate-100 rounded-[10px] mr-3 " src={`${API_URL}${article.cover.url}`} alt="" />
          <h2 className="text-[0.9rem] sm:text-[1.1rem]  md:text-[1.65em] lg:text-[14px] mt-1">{article.judul}</h2>
          </article>
          </Link>
              </>
            
          ))}
         
          
          
         </div>
        </section>
        </div>
      </main>
    </>
  );
};

type ServerSideData = {
  errorCode: boolean | number;
  detailBerita: DetailBerita;
  listBerita:Berita[]
};

// type URLParams = { id: string };

// export const getStaticPaths = (async () => {
//   return {
//     paths: [
//       {
//         params: {
//           id: 'next.js',
//         },
//       }, // See the "paths" section below
//     ],
//     fallback: true, // false or "blocking"
//   }
// }) 

export async function getServerSidePaths() {
  const res = await fetch(`${API_URL}/beritas`);
  const beritas = await res.json()
  console.log('ini')
  console.log(beritas)
  const paths = beritas.map((berita: any) => {
    return{
      params:{
        id:`${berita.id}`,
      }
    }
  });
  return{
    paths,
    fallback: false
  }
}

export const getServerSideProps: GetServerSideProps<ServerSideData> =
  async (context) => {
    try {
      console.log('ini id')
      const res = await fetch(`${API_URL}/beritas/${context.params?.id}`);
      // const [beritaList, beritaCount] = await Promise.all([
      //   await (
      //     await fetch(
      //       `${API_URL}/beritas?_sort=created_at:DESC&_start=0&_limit=6`
      //     )
      //   ).json(),
      //   await (await fetch(`${API_URL}/beritas/count`)).json(),
      // ]);
      const beritaList = await (await fetch(`${API_URL}/beritas?_sort=created_at:DESC&_start=0&_limit=3`)).json();
      const beritaCount = await (await fetch(`${API_URL}/beritas/count`)).json();

      const errorCode = res.ok ? false : res.status;
      const detailBerita = res.status === 404 ? null : await res.json();

      return {
        props: {
          errorCode,
          detailBerita,
          listBerita: beritaList,
        },
      };
    } catch (error) {
      console.error("Error in getServerSideProps:", error);

      return {
        props: {
          errorCode: 500, // Internal Server Error
          detailBerita: null,
          listBerita: [],
        },
      };
    }
  };


export default NewsPage;
