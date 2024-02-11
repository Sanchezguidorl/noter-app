import ButtonSection from "./layouts/ButtonSection"
import TasksList from './TasksList';

function TasksPanel() {

  return (
    <div id="TasksPanel" className="p-4 bg-base rounded-xl h-60 w-full overflow-hidden flex flex-col">
      <ul className="flex w-full gap-6">
      <li><ButtonSection text={"Tareas"}/></li>
      <li><ButtonSection text={"Recordatorios de audio"}/></li>
      </ul>
    <div className="mt-3 overflow-y-scroll px-2 pb-3">
<TasksList/>
    </div>
    </div>
  )
}

export default TasksPanel
