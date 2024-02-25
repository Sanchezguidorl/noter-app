"use client";
import { NotebookI } from "@/app/db/dbMock";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const CreateGetNotebooksContext = createContext<{notebooksData:NotebookI[]|[], refresh:()=>Promise<boolean>|null}>({notebooksData:[], refresh:()=>null});

export const useGetNotebooksContext = () => useContext(CreateGetNotebooksContext);

function GetNotebooksProvider({children}:{children:ReactNode}) {
  const [notebooksData, setNotebooksData] = useState<NotebookI[]>([]);
  
  const refresh = async () => {
    try {
      const getNotebooks = await fetch("http://localhost:3000/api/libretas");
      const notebooksDataParse = await getNotebooks.json();
      if(notebooksDataParse){
        setNotebooksData(notebooksDataParse);
      }
      return true;
    } catch (error) {
      throw new Error("No pudieron obtenerse las libretas");
    }
  };

useEffect(()=>{
  refresh();
},[])

  return (
    <CreateGetNotebooksContext.Provider value={{notebooksData:notebooksData, refresh}} >
      {children}
    </CreateGetNotebooksContext.Provider>
  )
}

export default GetNotebooksProvider;
