import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

function Papelera() {
  return (
    <div className='flex justify-center items-center flex-col h-full text-secondary-text text-center p-3'>
     <DeleteIcon style={{fontSize:90}}/>
     <p className=' text-4xl'>La papelera está vacía</p>
    </div>
  )
}

export default Papelera
