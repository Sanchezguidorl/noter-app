import Image from 'next/image'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

function NotFound() {
  return (
    <div id="NotFound" className='w-full flex justify-center items-center text-white'>
      <div className='flex flex-wrap items-center justify-center'>
        <Image src={'/not-found.webp'} height={280} width={280} alt='Icono de página no encontrada'/>
       <p className='text-3xl sm:text-6xl text-center'>
       ¿Estás perdido?
       </p>
        <Link href={'/'} className='flex- items-center w-full pt-10'>
    <div className=' p-3 px-8 bg-primary-buttons text-white w-fit mx-auto flex items-center gap-1 uppercase hover:brightness-125 hover:scale-110 transition-all duration-200 rounded-md hover:rounded-xl '>

        <p className='w-fit'>Volver a</p>
        <HomeIcon/>
    </div>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
