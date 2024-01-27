import BlogNotes from "@/components/BlogNotes";
import NotesPanel from "@/components/NotesPanel";
import TasksPanel from "@/components/TasksPanel";
import HeaderHome from "@/components/layouts/HeaderHome";

export default function Home() {
  return (
    <div className="w-full relative">
      <HeaderHome />
      <main className="top-1/4 absolute w-full p-6">
        <div className=" w-full flex gap-2 mb-6 flex-wrap sm:flex-nowrap items-center justify-center">
          <NotesPanel />
          <BlogNotes />
        </div>
        <TasksPanel />
      </main>
    </div>
  );
}
