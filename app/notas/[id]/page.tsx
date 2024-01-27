import { dbMockNotes } from '@/app/db/dbMock';
import ListNotes from '@/components/Pages/Notas/ListNotes';
import { NoteInterface } from '@/components/Pages/Notas/NoteCardPrevisualization';
import NoteContent from '@/components/Pages/Notas/NoteContent';
import React from 'react'

interface ParamsInterface{
  params:{id:string}
}
const noteEmpty={ title: "", itemId: "",date:"", content:"" }

function Notes({params}:ParamsInterface) {
  const notesData=dbMockNotes;
  return (
    <>
     <ListNotes list={notesData.listItems}/>
      <NoteContent note={notesData.listItems.find((item:NoteInterface)=>item.itemId===params.id) || noteEmpty}/>
    </>
  )
}

export default Notes;
