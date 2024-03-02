import React, { Dispatch, SetStateAction, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { TasksI } from "@/app/db/dbMock";
import { useGetTasksContext } from "@/contexts/GetTasksContext";
import ModalDeleteTask from "../modals/ModalDeleteTask";

function TaskItemButtons({
  isExpired,
  task,
  handleEdit,
  editTask,
  inputData,
  setErrorMessage
}: {
  isExpired: boolean;
  task: TasksI;
  handleEdit: (bool: boolean) => void;
  editTask: boolean;
  inputData: string;
  setErrorMessage:Dispatch<SetStateAction<{
    show: boolean;
    message: string;
  }>>
}) {
  const { refreshData } = useGetTasksContext();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const closeModal = () => {
    setShowModalDelete(false);
  };

  const handleSave = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (inputData.length === 0 || inputData.length < 20) {
      return;
    }
    try {
      const successTask = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tareas`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...task, toDo: inputData }),
        }
      );
const response= await successTask.json();

if(response.success){
  handleEdit(false);
  await refreshData();
}else{
  throw new Error(response.error.message);
}
    } catch (error) {
      setErrorMessage({
        show: true,
        message:
        (error as Error).message
      });
    }
  };

  const handleSuccess = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (inputData.length === 0) {
      return;
    }
    try {
      const successTask = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tareas`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...task, done: true }),
        }
      );

      await refreshData();
    } catch (error) {}
  };

  const switchEdit = (bool: boolean, event: React.MouseEvent) => {
    event.preventDefault();
    handleEdit(bool);
  };

  return (
    <>
      {showModalDelete && (
        <ModalDeleteTask
          idTask={task.id}
          closeModalDelete={closeModal}
          refreshData={async () => await refreshData()}
        />
      )}
      {!task.done ? (
        <div className="flex gap-3">
          {isExpired ? (
            <div
              onClick={(event) => {
                event.stopPropagation();
                setShowModalDelete(true);
              }}
              className={"p-3"}
            >
              <CloseIcon className=" text-button-action hover:text-delete-hover" />
            </div>
          ) : (
            <div className={"p-3 flex flex-col justify-between gap-3"}>
              {editTask ? (
                <SaveIcon
                  onClick={(event) => handleSave(event)}
                  className=" text-button-action hover:text-primary-buttons"
                />
              ) : (
                <>
                  <EditIcon
                    onClick={(event) => switchEdit(true, event)}
                    className=" text-button-action hover:text-primary-buttons"
                  />
                  <CheckCircleOutlineIcon
                    onClick={(event) => handleSuccess(event)}
                    className="text-button-action hover:text-success"
                  />
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className={"p-3 flex flex-col justify-between gap-3"}>
          <CloseIcon
            onClick={(event) => {
              event.stopPropagation();
              setShowModalDelete(true);
            }}
            className=" text-button-action hover:text-delete-hover"
          />
          <CheckCircleIcon className=" text-success" />
        </div>
      )}
    </>
  );
}

export default TaskItemButtons;
