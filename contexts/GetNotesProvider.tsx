"use client";

import { NoteI } from "@/app/db/dbMock";
import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface GetNotesContext {
  notesData: NoteI[];
  refreshData: () => Promise<boolean>|null;
}

const GetNotesContext = createContext<GetNotesContext>({
  notesData: [],
  refreshData: () =>null,
});

export const useGetNotesContext = () => useContext(GetNotesContext);

function GetNotesProvider({ children }: { children: ReactNode }) {
  const [notesData, setNotesData] = useState<NoteI[]>([]);

  const refreshData = async () => {
    try {
      const getDataNotes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notas`, {
        cache: "no-store",
      });
      const data = await getDataNotes?.json();
      setNotesData(data);
      return true;
    } catch (error) {
      throw new Error("No pudieron obtenerse las notas");
    }
  };

  useEffect(()=>{
    refreshData();
  },[])

  return (
    <GetNotesContext.Provider value={{ notesData: notesData, refreshData: refreshData }}>
      {children}
    </GetNotesContext.Provider>
  );
}

export default GetNotesProvider;