import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { TasksI } from "@/app/db/dbMock";
import { useGetTasksContext } from "@/contexts/GetTasksContext";

function TaskItemButtons({
  isExpired,
  task,
  handleEdit,
  editTask,
  inputData
}: {
  isExpired: boolean;
  task:TasksI
  handleEdit: (bool: boolean) => void;
  editTask: boolean;
  inputData:string;
}) {
  const {refreshData}=useGetTasksContext();

  const handleSuccess = async(event: React.MouseEvent) => {
    event.preventDefault();

    try {
      const successTask= await fetch(`http://localhost:3000/api/tareas`,{
        "method":"PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({...task, done:true})
      });

    await  refreshData();
    } catch (error) {
      
    }
  };

  const handleSave = async(event: React.MouseEvent) => {
    event.preventDefault();

    try {
      const successTask= await fetch(`http://localhost:3000/api/tareas`,{
        "method":"PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({...task, toDo:inputData})
      });

      switchEdit(false,event);
    await  refreshData();
    } catch (error) {
      
    }
  };

  const switchEdit = (bool: boolean, event: React.MouseEvent) => {
    event.preventDefault();
    handleEdit(bool);
  };

  const handleDelete = async(id: string, event: React.MouseEvent) => {
    event.preventDefault();

    try {
      const deleteTask= await fetch(`http://localhost:3000/api/tareas?id=${id}`,{
        "method":"DELETE"
      });

      const refresh=await refreshData();
    } catch (error) {
      
    }
  };

  return (
    <>
      {!task.done ? (
        <div className="flex gap-3">
          {isExpired ? (
            <div onClick={(event) => handleDelete(task.id, event)} className={"p-3"}>
              <CloseIcon className=" text-button-action hover:text-delete-hover" />
            </div>
          ) : (
            <div className={"p-3 flex flex-col justify-between gap-3"}>
              {editTask ? (
                <SaveIcon
                  onClick={(event) =>handleSave(event)}
                  className=" text-button-action hover:text-primary-buttons"
                />
              ) : (
                <EditIcon
                  onClick={(event) => switchEdit(true, event)}
                  className=" text-button-action hover:text-primary-buttons"
                />
              )}
              <CheckCircleOutlineIcon
                onClick={(event)=>handleSuccess(event)}
                className="text-button-action hover:text-success"
              />
            </div>
          )}
        </div>
      ) : (
        <div className={"p-3 flex flex-col justify-between gap-3"}>
          <CloseIcon onClick={(event)=>handleDelete(task.id,event)} className=" text-button-action hover:text-delete-hover" />
          <CheckCircleIcon className=" text-success" />
        </div>
      )}
    </>
  );
}

export default TaskItemButtons;
