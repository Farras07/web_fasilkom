import React from 'react'
import Image from 'next/image'
import Calendar from '../Assets/Calendar'
import Avatar from '../Assets/Avatar'
import { DetailBerita } from "../../constants/types";
import { API_URL } from "../../constants";
import Link from 'next/link'


export default function CardNews({berita}:{berita:DetailBerita}) {
  return (
    <Link href={`/berita/${berita.id}`}>
      <a className='group cursor-pointer bg-gradient-cust-orange2 hover:bg-none rounded-[10px] p-[.1rem] w-full min-[550px]:w-[80%] sm:max-w-none sm:w-[60%] md:w-[45%]  min-[1100px]:w-fit'>
        <article className='w-fit min-[1100px]:w-[20rem] rounded-[8px] p-3 pb-8 flex flex-col flex-wrap lg:justify-center bg-white hover:bg-pastel '>
          <Image className='rounded-xl bg-cover object-cover' src={`${API_URL}${berita.cover.url}`} width={300} height={180} alt='News'/>
          <section className='px-2 py-2'>
            <section className='flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <Calendar />
                <p className='text-xs'>{new Date(berita.created_at).toDateString()}</p>
              </div>
              <div className='flex items-center gap-2'>
                <Avatar />
                <p className='text-xs'>{`${berita.author.firstname}`}</p>
              </div>
            </section>
            <section className='mt-4 text-justify flex flex-col flex-wrap'>
              <h4 className='text-typedBlue text-sm lg:text-lg font-bold'>{berita.judul}</h4>
              <p className='text-sm sm:text-md mt-3'>
                 {berita.pratinjau.length > 200
                  ? berita.pratinjau.slice(0, 200) + "..."
                  : berita.pratinjau
                } 
              </p>
            </section>
          </section>
        </article>
      </a>
    </Link>
  )
}
