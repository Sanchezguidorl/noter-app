import { TasksI } from "@/app/db/dbMock";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { useState } from "react";
import { readDate } from "./../app/utils/utils";
import TaskItemButtons from "./Buttons/TaskItemButtons";
import ErrorMessage from "./layouts/ErrorMessage";

function TaskListItem({ task }: { task: TasksI }) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<boolean>(false);
  const [inputData, setInputData] = useState<string>(task.toDo);
  const isExpire = (date: number): boolean => {
    const dateNow = new Date().getTime();
    return dateNow > date;
  };
  const [errorMessage, setErrorMessage] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

  const bgByLimitDate = () => {
    let className = "";
    if (task.done) {
      className = "bg-success-alert";
    } else if (isExpire(task.limitDate)) {
      className = "bg-delete-alert line-through";
    } else {
      className = "bg-warning-alert";
    }

    return className;
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputData(event.target.value);
  };

  return (
    <div
      onClick={() => setIsActive(!isActive)}
      className={`p-4 pt-8 transition-all duration-300 ${bgByLimitDate()} rounded-lg mt-3 relative cursor-pointer`}
    >
      <div className="flex items-center justify-between">
          {editTask ? (
            <div className={`relative w-full p-1 ${inputData.length===0?" border border-delete-hover":""}`}>
            <textarea
              onChange={handleChange}
              className={`pt-1 bg-c-transparent w-full h-full min-h-28 resize-none`}
              placeholder="Agrega una tarea"
            >
              {task.toDo}
            </textarea>
            <p className={`text-delete-hover text-xs abslute top-full ${inputData.length===0?"visible":"invisible"}`}>La tarea no debe estar vacía</p>
            <p className={`text-delete-hover text-xs abslute top-full ${inputData.length<20?"visible":"invisible"}`}>La tarea debe tener un mínimo de 20 dígitos</p>
            </div>
          ) : (
            <p
              className={` pt-1 ${
                !isActive ?"overflow-hidden text-ellipsis text-nowrap":"text-wrap break-words"
              }`}
            >{ task.toDo}
            </p>
          )}
        <TaskItemButtons
          inputData={inputData}
          isExpired={isExpire(task.limitDate)}
          task={task}
          handleEdit={setEditTask}
          editTask={editTask}
          setErrorMessage={setErrorMessage}
        />
      </div>
      <p
        className={` flex items-center gap-1 text-button-action absolute top-2 left-4  `}
      >
        {readDate(task.limitDate)} <AccessAlarmIcon />
      </p>
      {errorMessage.show && (
        <ErrorMessage
          message={errorMessage.message}
          closeMessage={setErrorMessage}
        />
      )}
    </div>
  );
}

export default TaskListItem;
