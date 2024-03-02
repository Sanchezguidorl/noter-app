"use client";
import React, { useState} from "react";
import GetTasksProvider from "@/contexts/GetTasksContext";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import CreateTasks from "@/components/Pages/Tareas/CreateTasks";
import TasksList from "@/components/TasksList";

function TaksRoute() {
  const [createTask, setCreateTask] = useState<boolean>(false);

  return (
    <div className="h-full">
      <div className="relative mb-3">
        <h1 className="text-3xl">Tareas</h1>
        <AddToPhotosIcon
          className="absolute top-1 right-4 cursor-pointer text-3xl hover:text-button-action hover:scale-110 transition-all duration-200"
          onClick={() => setCreateTask(true)}
        />
      </div>
      <GetTasksProvider>
        <CreateTasks selected={createTask} unselect={setCreateTask} />
        <div className="relative h-[95%] ">
            <TasksList />
        </div>
      </GetTasksProvider>
    </div>
  );
}

export default TaksRoute;
