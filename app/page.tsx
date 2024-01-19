import BlogNotes from "@/components/BlogNotes";
import NotesPanel from "@/components/NotesPanel";
import TasksPanel from "@/components/TasksPanel";
import Header from "@/components/layouts/Header";
import NavCompact from "@/components/layouts/NavCompact";
import NavComponent from "@/components/layouts/NavComponent";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex  h-full">
      <NavComponent />
      <NavCompact />
      <div className="w-full relative">
        <Header />
        <main className="top-1/4 absolute w-full p-6">
          <div className=" w-full flex gap-2 mb-6 flex-wrap sm:flex-nowrap items-center justify-center">
            <NotesPanel />
            <BlogNotes />
          </div>
          <TasksPanel />
        </main>
      </div>
    </div>
  );
}
