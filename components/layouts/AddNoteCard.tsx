import React from 'react'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
function AddNoteCard() {
  return (
    <div
      id="NoteCard"
      className=" bg-primary h-full max-h-full w-40 min-w-40 rounded-xl p-2 relative"
    >
      <div className=" text-primary-buttons overflow-y-hidden h-36">
        <div className=' mx-auto border-4 rounded-full w-1/2 h-1/2 flex justify-center items-center mt-7'>
        <NoteAddIcon className='w-12 h-12'/>
        </div>
        <p className="text-center mt-2 text-sm uppercase">
Crear nota
        </p>
      </div>
      <p className=" text-secondary-text absolute bottom-2">3 ene</p>
    </div>
  )
}

export default AddNoteCard
