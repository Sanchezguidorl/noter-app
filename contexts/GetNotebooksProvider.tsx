"use client";
import { NotebookI } from "@/app/db/dbMock";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useAuthUserContext } from "./AuthUserProvider";

const CreateGetNotebooksContext = createContext<{notebooksData:NotebookI[]|[], refresh:()=>Promise<boolean>|null}>({notebooksData:[], refresh:()=>null});

export const useGetNotebooksContext = () => useContext(CreateGetNotebooksContext);

function GetNotebooksProvider({children}:{children:ReactNode}) {
  const [notebooksData, setNotebooksData] = useState<NotebookI[]>([]);
  const {user}=useAuthUserContext();
  const refresh = async () => {
    try {
      const getNotebooks = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/libretas?userId=${user.uid}`,{
        cache:"no-cache"
      });
      const notebooksDataParse = await getNotebooks.json();
      if(notebooksDataParse.success){
        setNotebooksData(notebooksDataParse.data);
      }
      return true;
    } catch (error) {
      throw new Error("No pudieron obtenerse las libretas");
    }
  };

useEffect(()=>{
  if(user.uid){
  refresh();}
},[user.uid])
  return (
    <CreateGetNotebooksContext.Provider value={{notebooksData:notebooksData, refresh}} >
      {children}
    </CreateGetNotebooksContext.Provider>
  )
}

export default GetNotebooksProvider;
