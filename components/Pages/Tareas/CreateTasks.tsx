"use client";
import { useGetTasksContext } from "@/contexts/GetTasksContext";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ErrorMessage from "@/components/layouts/ErrorMessage";
import { useAuthUserContext } from "@/contexts/AuthUserProvider";
function CreateTasks({
  selected,
  unselect,
}: {
  selected: boolean;
  unselect: Dispatch<SetStateAction<boolean>>;
}) {
  const [newTask, setNewTask] = useState<{
    toDo: string;
    limitDate: number;
    done: boolean;
    userId: string;
  }>({
    toDo: "",
    limitDate: 0,
    done: false,
    userId:""
  });
  const [errorInputs, setErrorInputs] = useState({
    toDo: { valid: false },
    limitDate: { valid: false },
  });
  const { refreshData } = useGetTasksContext();
  const [errorMessage, setErrorMessage] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });
  const {user}= useAuthUserContext();

  useEffect(() => {
    if (newTask.toDo.length > 20 && newTask.toDo.length <= 200) {
      setErrorInputs({ ...errorInputs, toDo: { valid: true } });
    } else {
      setErrorInputs({ ...errorInputs, toDo: { valid: false } });
    }
  }, [newTask.toDo]);

  useEffect(() => {
    if (newTask.limitDate > Date.now()) {
      setErrorInputs({ ...errorInputs, limitDate: { valid: true } });
    } else {
      setErrorInputs({ ...errorInputs, limitDate: { valid: false } });
    }
  }, [newTask.limitDate]);

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, limitDate: event.target.valueAsNumber });
  };

  const handleChangeToDo = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTask({ ...newTask, toDo: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!(errorInputs.toDo.valid && errorInputs.limitDate.valid)) {
        throw new Error("Los campos deben ser completados de manera correcta");
      }
      const createTask = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tareas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...newTask, userId:user.uid}),
        }
      );

const response= await createTask.json();
      
      if (response.success) {
        const refresh = await refreshData();
        unselect(false);
      } else {
        throw new Error(
          response.error.message
        );
      }
    } catch (error) {
      setErrorMessage({
        show: true,
        message: (error as Error).message
      });
    }
  };

  return (
    <div
      className={` transition-all duration-500 ${
        selected ? "max-h-[1000px]" : "max-h-0"
      } overflow-hidden`}
    >
      <form
        onSubmit={handleSubmit}
        action=""
        className="px-4 py-6 bg-interactive rounded-lg relative"
      >
        <div className="flex flex-col relative mb-4">
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
          {!errorInputs.limitDate.valid && newTask.toDo.length === 0 ? (
            <p className="absolute top-full left-0 text-delete-hover text-xs">
              La tarea no debe estar vacía
            </p>
          ) : newTask.toDo.length < 20 ? (
            <p className="absolute top-full left-0 text-delete-hover text-xs">
              La tarea debe tener un mínimo de 20 caracteres
            </p>
          ) : (
            newTask.toDo.length >= 200 && (
              <p className="absolute top-full left-0 text-delete-hover text-xs">
                La tarea debe tener un máximo de 200 caracteres
              </p>
            )
          )}
        </div>
        <div className="flex flex-col relative">
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
          {!errorInputs.limitDate.valid && newTask.limitDate === 0 ? (
            <p className="absolute top-full left-0 text-delete-hover text-xs">
              Debes seleccionar una fecha
            </p>
          ) : (
            newTask.limitDate <= Date.now() && (
              <p className="absolute top-full left-0 text-delete-hover text-xs">
                La fecha debe ser mayor a un día de la fecha actual
              </p>
            )
          )}
        </div>
        <CloseIcon
          className="absolute top-3 right-3 cursor-pointer hover:brightness-150 text-button-action"
          onClick={() => unselect(false)}
        />
      </form>
      {errorMessage.show && (
        <ErrorMessage
          message={errorMessage.message}
          closeMessage={setErrorMessage}
        />
      )}
    </div>
  );
}

export default CreateTasks;
