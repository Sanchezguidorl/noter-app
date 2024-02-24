"use client";
import TaskListItem from './TaskListItem';
import { TasksI } from '@/app/db/dbMock';
import { useGetTasksContext } from '@/contexts/GetTasksContext';
import { useEffect } from 'react';

function TasksList() {
  const {tasksData, refreshData}=useGetTasksContext();

  useEffect(()=>{
refreshData();
  },[]);

  return (
    <>
      {tasksData?.map((task:TasksI) => (
        <TaskListItem
          key={task.id?.toString()}
          task={task}
        />
      ))}
    </>
  );
}

export default TasksList;