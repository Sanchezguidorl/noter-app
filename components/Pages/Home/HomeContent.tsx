import NavCompact from '@/components/layouts/NavCompact'
import React from 'react'
import HeaderHome from '@/components/layouts/HeaderHome';
import NavComponent from '@/components/layouts/NavComponent';
import GetNotesProvider from '@/contexts/GetNotesProvider';
import NotesPanel from '@/components/NotesPanel';
import BlogNotes from '@/components/BlogNotes';
import TasksPanel from '@/components/TasksPanel';

function HomeContent() {
  return (
    <div className="flex flex-col sm:flex-row h-full">
    <NavCompact />
    <NavComponent />
    <div className="w-full relative">
      <HeaderHome />
      <main className="top-1/4 absolute w-full p-6">
        <div className=" w-full flex gap-2 mb-6 flex-wrap sm:flex-nowrap items-center justify-center">
        <GetNotesProvider>
          <NotesPanel />
          </GetNotesProvider>
          <BlogNotes />
        </div>
        <TasksPanel />
      </main>
    </div>
    </div>
  )
}

export default HomeContent
