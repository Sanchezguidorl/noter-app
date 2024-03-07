"use client";

import { TasksI } from "@/app/db/dbMock";
import { ReactNode, useContext, useState, useEffect } from "react";
import { createContext } from "react";
import { useAuthUserContext } from "./AuthUserProvider";

interface GetTasksContextI {
    tasksData: TasksI[];
  refreshData: () => Promise<TasksI[]>|null;
}

const GetTasksContext = createContext<GetTasksContextI>({
  tasksData: [],
  refreshData: () =>null,
});

export const useGetTasksContext = () => useContext(GetTasksContext);

function GetTasksProvider({ children }: { children: ReactNode }) {
  const [tasksData, setTasksData] = useState<TasksI[]>([]);
  const {user}=useAuthUserContext();
  const refreshData = async () => {
    try {
      const getTasksNotes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tareas?userId=${user.uid}`, {
        cache: "no-store",
      });
      const data = await getTasksNotes?.json();
      setTasksData(data.data); 
      return data;
    } catch (error) {
      throw new Error("No pudieron obtenerse las tareas");
    }
  };

  useEffect(()=>{
    if(user.uid){
      refreshData();}
  },[user.uid])

  return (
    <GetTasksContext.Provider value={{ tasksData: tasksData, refreshData: refreshData }}>
      {children}
    </GetTasksContext.Provider>
  );
}

export default GetTasksProvider;