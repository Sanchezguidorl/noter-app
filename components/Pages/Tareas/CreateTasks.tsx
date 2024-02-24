"use client";
import { useGetTasksContext } from "@/contexts/GetTasksContext";
import { Dispatch, SetStateAction, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
function CreateTasks({selected, unselect}:{selected:boolean, unselect:Dispatch<SetStateAction<boolean>>}) {
  const [newTask, setNewTask] = useState<{
    toDo: string;
    limitDate: number;
    done: boolean;
  }>({
    toDo: "",
    limitDate: 0,
    done: false,
  });

  const { refreshData } = useGetTasksContext();

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, limitDate: event.target.valueAsNumber });
  };

  const handleChangeToDo = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTask({ ...newTask, toDo: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const createTask = await fetch("http://localhost:3000/api/tareas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

        const refresh=await refreshData();
      if(refresh) {
        unselect(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={` transition-all duration-500 ${selected?"max-h-[1000px]":"max-h-0"} overflow-hidden`}>
      <form
        onSubmit={handleSubmit}
        action=""
        className="p-4 bg-interactive rounded-lg relative"
      >
        <div className="flex flex-col">
          <label
            className="uppercase text-button-action  py-2"
            htmlFor="taskInput"
          >
            Descripción
          </label>
          <textarea
            className="bg-c-transparent max-h-60 text-sm"
            id="taskInput"
            onChange={handleChangeToDo}
            placeholder="Describe la nueva tarea"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label
            className="uppercase text-button-action  py-2"
            htmlFor="dateInput"
          >
            Fecha límite para completarla
          </label>
          <div className="flex justify-between">
            <input
              type="date"
              onChange={handleChangeDate}
              className="bg-c-transparent w-40 text-secondary-text date-input text-xl"
            />
            <input
              type="submit"
              value="Guardar tarea"
              className="bg-primary-buttons py-2 px-3 cursor-pointer hover:brightness-125 uppercase text-sm"
            />
          </div>
        </div>
        <CloseIcon className="absolute top-3 right-3 cursor-pointer hover:brightness-150 text-button-action" onClick={()=>unselect(false)}/>
      </form>
    </div>
  );
}

export default CreateTasks;
