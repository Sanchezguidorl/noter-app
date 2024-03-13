'use client';
import React, { useState, useEffect, useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

function AddButtonDropDown() {
  const [showOptions, setShowOptions] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null); 
  useEffect(() => {
    const handleClickOutside = (event:MouseEvent) => {
      if ( !dropDownRef.current?.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);

  return (
    <div onClick={() => setShowOptions(prev => !prev)} className="relative h-10 text-xs bg-primary-buttons rounded-full px-3 mx-2 cursor-pointer flex items-center text-primary">
      <div className='flex gap-1 items-center hover:text-secondary-text'>
        <div className='relative'>
          <AddIcon />
        </div>
        Agregar nueva
      </div>
      <div ref={dropDownRef} className={`absolute overflow-hidden top-0 text-secondary-text left-full uppercase bg-black z-20 transition-all duration-200 rounded-md rounded-l-none ${showOptions ? 'max-w-48' : 'max-w-0'}`}>
        <ul>
            <li className='py-1 px-2 hover:text-white text-nowrap'>
          <Link href={'/notas/agregar' } className='w-full' onClick={() => setShowOptions(false)}>
              <AddIcon /> Nota
          </Link>
            </li>
            <li className='py-1 px-2 hover:text-white text-nowrap'>
          <Link href={'/tareas'} className='w-full' onClick={() => setShowOptions(false)}>
              <AddIcon /> Tarea
          </Link>
            </li>
        </ul>
      </div>
    </div>
  );
}

export default AddButtonDropDown;