import Link from "next/link";
import ButtonSection from "./layouts/ButtonSection";
import TasksList from "./TasksList";
import GetTasksProvider from "@/contexts/GetTasksContext";

function TasksPanel() {
  return (
    <div
      id="TasksPanel"
      className="p-4 bg-base rounded-xl h-60 w-full overflow-hidden flex flex-col"
    >
      <ul className="flex w-full gap-6">
        <li>
          <Link href="/tareas">
          <ButtonSection isActive={true} text={"Tareas"} />
          </Link>
        </li>
        {/*
          <li>
          <ButtonSection
            isActive={sectionActive === "audio"}
            text={"Recordatorios de audio"}
          />
        </li>
  */}
      </ul>
      <div className="mt-3 overflow-y-auto px-2 pb-3 h-full relative">
        <GetTasksProvider>
          <TasksList />
        </GetTasksProvider>
      </div>
    </div>
  );
}

export default TasksPanel;
