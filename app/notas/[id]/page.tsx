"use client";
import { NoteI } from "@/app/db/dbMock";
import Loading from "@/app/loading";
import ListNotes from "@/components/Pages/Notas/ListNotes";
import NoteContent from "@/components/Pages/Notas/NoteContent";
import React, { useState, useEffect, Suspense } from "react";

interface ParamsInterface {
  params: {
    id: string;
  };
}

const noteEmpty = {
  title: "",
  id: "",
  date: new Date().getTime(),
  content: "",
};

function Notes({ params }: ParamsInterface) {
  const [notesData, setNotesData] = useState<NoteI[]>([noteEmpty]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      const getDataNotes = await fetch("http://localhost:3000/api/notas", {
        cache: "no-store",
      });
      const data = await getDataNotes?.json();
      setNotesData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
          <div className="h-96 w-full">
            <Loading text={"Cargando datos..."} />
          </div>
      ) : (
        <>
          <ListNotes list={notesData} />
          <NoteContent
            isNewNote={notesData?.find((item: NoteI) => item.id === params.id)? false: true}
            refresh={getData}
            note={
              notesData?.find((item: NoteI) => item.id === params.id) ||
              noteEmpty
            }
          />
        </>
      )}
    </>
  );
}

export default Notes;
