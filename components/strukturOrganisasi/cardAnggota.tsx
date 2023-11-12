import React from 'react'
import Image from 'next/image'
import { API_URL } from '../../constants'
export default function cardAnggota({nama,jabatan,jurusan,linkedin,foto,angkatan}:{nama:string,jabatan:string,jurusan:string,linkedin:string,foto:string,angkatan:number}) {
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
  return (
    <article className='card hover:translate-y-[-10px] transition-all overflow-hidden flex flex-col gap-7 lg:gap-6 rounded-md w-fit lg:h-[30%] lg:w-[250px] border-2 bg-pastel pb-4 box-border drop-shadow'>
        <div className='w-full h-[40%] flex flex-col flex-wrap gap-0 items-center'>
            <figure className='w-full h-full'>
                <Image className='object-cover rounded-t-xl' src={`${API_URL}${foto}`} width={400} height={400} alt='Card Image'/>
            </figure>
            <figcaption className='text-typedBlue text-center lg:text-sm'>{jabatan}</figcaption>
        </div>
        <div className='flex flex-col flex-wrap w-full items-center gap-2'>
            <h4 className='nama flex items-center leading-6 text-base font-bold text-typedBlue text-center mb-4 h-[1rem] px-2'>{nameHandler(nama)}</h4>
            <p className='text-[#6C6C6C]'>{jurusan} - {angkatan}</p>
            <figure className='hover:scale-[1.1] transition-all hover:animate-bounce cursor-pointer'>
                <a href={linkedin} target='_blank' rel="noreferrer">
                    <Image src={'/icons/vectorLinkedin.svg'} width={20} height={20} alt='Linkedin'/>
                </a>
            </figure>
        </div>
    </article>
  )
}
