import { NoteI } from "@/app/db/dbMock";
import ListNotes from "@/components/Pages/Notas/ListNotes";
import NoteContent from "@/components/Pages/Notas/NoteContent";
import React from "react";

interface ParamsInterface {
  params: { id: string };
}
const noteEmpty = { title: "", itemId: "", date: "", content: "" };

async function Notes({ params }: ParamsInterface) {
  const getDataNotes = await fetch("http://localhost:3000/api/notas").catch(() =>
    console.log("llegaste aca")
  );
  const notesData = await getDataNotes?.json();

  return (
    <>
      <ListNotes list={notesData} />
      <NoteContent
        note={
          notesData.find(
            (item: NoteI) => item.id === params.id
          ) || noteEmpty
        }
      />
    </>
  );
}

export default Notes;
