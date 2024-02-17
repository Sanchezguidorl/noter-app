"use client";

import { NoteI } from "@/app/db/dbMock";
import { ReactNode, useContext, useState } from "react";
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
      const getDataNotes = await fetch("http://localhost:3000/api/notas", {
        cache: "no-store",
      });
      const data = await getDataNotes?.json();
      setNotesData(data);
      return true;
    } catch (error) {
      throw new Error("No pudieron obtenerse las notas");
    }
  };

  return (
    <GetNotesContext.Provider value={{ notesData: notesData, refreshData: refreshData }}>
      {children}
    </GetNotesContext.Provider>
  );
}

export default GetNotesProvider;