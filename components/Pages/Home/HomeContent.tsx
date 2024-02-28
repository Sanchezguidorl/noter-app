import React from 'react'
import HeaderHome from '@/components/layouts/HeaderHome';
import NotesPanel from '@/components/NotesPanel';
import BlogNotes from '@/components/BlogNotes';
import TasksPanel from '@/components/TasksPanel';
import UserLogged from '@/components/UserLogged';

function HomeContent() {
  return (<>

    <div className="w-full relative">
      <UserLogged/>
      <HeaderHome />
      <main className="top-1/4 absolute w-full p-6">
        <div className=" w-full flex gap-2 mb-6 flex-wrap sm:flex-nowrap items-center justify-center">
          <NotesPanel />
          <BlogNotes />
        </div>
        <TasksPanel />
      </main>
    </div>
    </>
  )
}

export default HomeContent
