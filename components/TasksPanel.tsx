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
          <ButtonSection isActive={true} text={"Tareas"} />
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
      <div className="mt-3 overflow-y-scroll px-2 pb-3">
        <GetTasksProvider>
          <TasksList />
        </GetTasksProvider>
      </div>
    </div>
  );
}

export default TasksPanel;
