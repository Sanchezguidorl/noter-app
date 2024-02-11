import React from 'react'
import TaskListItem from './TaskListItem'
import { TasksI } from '@/app/db/dbMock'

async function TasksList() {
  const getTasks=await fetch("http://localhost:3000/api/tareas", {cache:'no-store'
  });

  const tasksData:TasksI[]= await getTasks.json();

  return (
    <>
{tasksData.map((task)=>
(
    <TaskListItem key={task.id.toString()} id={task.id} toDo={task.toDo} limitDate={task.limitDate} done={task.done} />)
)
}
</>
)
}

export default TasksList
