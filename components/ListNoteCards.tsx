"use client";
import { useEffect, useState } from 'react';
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

  useEffect(()=>{
    getData();
  },[]);

  return (
    <>
      {
        notesData.map((note:NoteI)=>(
          <NoteCard key={note.id} refreshData={getData} data={note}/>
        ))
      }
    </>
  )
}

export default ListNoteCards;