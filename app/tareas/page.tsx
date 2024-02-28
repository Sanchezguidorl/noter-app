"use client"
import React, { useState, Suspense, lazy } from 'react';
import GetTasksProvider from '@/contexts/GetTasksContext';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CreateTasks from '@/components/Pages/Tareas/CreateTasks';
import Loading from '@/app/loading';

const TasksListLazy = lazy(() => import('@/components/TasksList'));

function TaksRoute() {
  const [createTask, setCreateTask] = useState<boolean>(false);

  return (
    <div className="">
      <div className="relative mb-3">
        <h1 className="text-3xl">Tareas</h1>
        <AddToPhotosIcon className='absolute top-1 right-4 cursor-pointer text-3xl hover:text-button-action hover:scale-110 transition-all duration-200' onClick={() => setCreateTask(true)} />
      </div>
      <GetTasksProvider>
        <CreateTasks selected={createTask} unselect={setCreateTask} />
        <div className="relative min-h-40">
        <Suspense fallback={<Loading text="Cargando..."/>}>
          <TasksListLazy />
        </Suspense>
    </div>
      </GetTasksProvider>
    </div>
  );
}

export default TaksRoute;