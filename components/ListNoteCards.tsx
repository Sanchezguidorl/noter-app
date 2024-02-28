"use client";
import NoteCard from './NoteCard';
import { NoteI } from '@/app/db/dbMock';
import { useGetNotesContext } from '@/contexts/GetNotesProvider';

function ListNoteCards() {
  const {notesData,refreshData}=useGetNotesContext();

  const getData=async()=>{
    const freshData=await refreshData();
    if(freshData){
      return;
    }
  }

  return (
    <>
      {
        notesData.map((note:NoteI)=>(
          <NoteCard key={note.id} data={note}/>
        ))
      }
    </>
  )
}

export default ListNoteCards;