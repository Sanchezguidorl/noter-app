import Link from "next/link";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import TaskItemButtons from "./Buttons/TaskItemButtons";
import { readDate } from "./../app/utils/utils";
import { TasksI } from "@/app/db/dbMock";
import { useState } from "react";

function TaskListItem({ task}: {task:TasksI}) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<boolean>(false);
  const [inputData, setInputData]= useState<string>(task.toDo);
  const isExpire = (date: number): boolean => {
    const dateNow = new Date().getTime();
    return dateNow > date;
  };

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

const handleChange=(event:React.ChangeEvent<HTMLTextAreaElement>)=>{
setInputData(event.target.value);
}

  return (
    <div
      onClick={() => setIsActive(!isActive)}
      className={`p-4 pt-8 ${bgByLimitDate()} rounded-lg mt-3 relative cursor-pointer`}
    >
      <div className="flex items-center justify-between">
        <div className="w-full">
{editTask ?
<textarea onChange={handleChange} className=" pt-1 bg-c-transparent w-full h-fit min-h-28" placeholder="Agrega una tarea">{task.toDo}</textarea>

:
            <p className={` pt-1 ${!isActive && "text-nowrap whitespace-nowrap overflow-hidden"} text-ellipsis `}>
            {task.toDo}
          </p>
}
        </div>
        <TaskItemButtons inputData={inputData} isExpired={isExpire(task.limitDate)} task={task} handleEdit={setEditTask} editTask={editTask}/>
      </div>
      <p className={` flex items-center gap-1 text-button-action absolute top-2 left-4  `}>
        {readDate(task.limitDate)} <AccessAlarmIcon />
      </p>
    </div>
  );
}

export default TaskListItem;