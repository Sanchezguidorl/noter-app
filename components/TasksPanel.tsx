import ButtonSection from "./layouts/ButtonSection"

function TasksPanel() {
  return (
    <div id="TasksPanel" className="p-4 bg-base rounded-xl h-60 w-full">
      <ul className="flex w-full gap-6">
      <li><ButtonSection text={"Tareas"}/></li>
      <li><ButtonSection text={"Recordatorios de audio"}/></li>
      </ul>
    <div>

    </div>
    </div>
  )
}

export default TasksPanel
