"use client";
import ListNotes from "@/components/Pages/Notas/ListNotes";
import NoteContent from "@/components/Pages/Notas/NoteContent";
import {
  useSelectNotesContext,
} from "@/contexts/SelectNotesProvider";
import { useEffect } from "react";
interface ParamsInterface {
  params: {
    id: string;
  };
}
function Notes({ params }: ParamsInterface) {
  const { idSelected, selectId} = useSelectNotesContext();

useEffect(()=>{
  selectId(params.id);
},[]);

  return (
    <>
      <ListNotes selectId={selectId} id={idSelected} />
      <NoteContent id={idSelected} />
    </>
  );
}

export default Notes;
