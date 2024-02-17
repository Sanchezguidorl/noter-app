'use client';
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

function AddButtonDropDown() {
    const [showOptions,setShowOptions]=useState<boolean>(false);

  return (
    <div className="relative h-10  text-xs bg-primary-buttons rounded-full px-3 mx-2 cursor-pointer flex items-center text-primary">
 <div onClick={()=>setShowOptions(!showOptions)} className='flex gap-1  items-center hover:text-secondary-text'>
 <div className='relative'>
    <AddIcon /> 
    </div>
    Agregar nueva
 </div>
 <ul className={`absolute overflow-hidden top-0 text-secondary-text
  left-full uppercase bg-black z-40 transition-all duration-200 rounded-md rounded-l-none ${showOptions ? 'w-28': 'w-0'}`}>
            <Link href={'/notas/agregar'}>
        <li className='py-1 px-2 hover:text-white'>
            <AddIcon />  Nota
        </li>
            </Link>
        <li className='py-1 px-2 hover:text-white'>
            <Link href={'/'}>
            <AddIcon />  Tarea
            </Link>
        </li>
    </ul>
  </div>
  )
}

export default AddButtonDropDown
