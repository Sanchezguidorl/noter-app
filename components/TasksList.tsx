"use client";
import Loading from "@/app/loading";
const TaskListItem = lazy(() => import("./TaskListItem"));
import { TasksI } from "@/app/db/dbMock";
import { useGetTasksContext } from "@/contexts/GetTasksContext";
import { Suspense, lazy } from "react";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
function TasksList() {
  const { tasksData } = useGetTasksContext();
  return (
    <>
      <Suspense
        fallback={<Loading useIcon={true} text="Cargando tareas..." />}>
        {tasksData.length===0 ?
                <div className="text-secondary-text flex justify-center items-center h-full text-xl sm:text-3xl ">
                <p className="flex justify-center items-center gap-1">
                  <HistoryToggleOffIcon fontSize="large" />
                  No tienes tareas agregadas
                </p>
              </div>
              :
       <>{tasksData?.map((task: TasksI) => (
          <TaskListItem key={task.id?.toString()} task={task} />
          ))}</>
        }
      </Suspense>
    </>
  );
}

export default TasksList;
