"use client";

import { TasksI } from "@/app/db/dbMock";
import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";

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

  const refreshData = async () => {
    try {
      const getTasksNotes = await fetch("http://localhost:3000/api/tareas", {
        cache: "no-store",
      });
      const data = await getTasksNotes?.json();
      setTasksData(data); 
      return data;
    } catch (error) {
      throw new Error("No pudieron obtenerse las tareas");
    }
  };

  return (
    <GetTasksContext.Provider value={{ tasksData: tasksData, refreshData: refreshData }}>
      {children}
    </GetTasksContext.Provider>
  );
}

export default GetTasksProvider;