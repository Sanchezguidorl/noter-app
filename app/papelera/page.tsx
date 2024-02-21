import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import NavCompact from '@/components/layouts/NavCompact';
import NavComponent from '@/components/layouts/NavComponent';

function Papelera() {
  return (
    <div className="flex flex-col sm:flex-row h-full">
    <NavCompact />
    <NavComponent />
    <div className='flex justify-center w-full items-center flex-col h-full text-secondary-text text-center p-3'>
     <DeleteIcon style={{fontSize:90}}/>
     <p className=' text-4xl'>La papelera está vacía</p>
    </div>
    </div>
  )
}

export default Papelera
