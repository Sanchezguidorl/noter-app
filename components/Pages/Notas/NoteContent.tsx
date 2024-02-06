
import { NoteI } from '@/app/db/dbMock'
import '../../../styles/NoteEditAndAdd.css'
function NoteContent({note}:{note:NoteI}) {

  return (
    <div className=" w-full h-screen bg-primary">
      <div id="NoteContentPanel" className="text-white py-8 px-3">
      <label htmlFor="TitleInpuut">
        {""}
      </label>
        <input id="TitleInpuut" type="text" className="w-full h-10 bg-primary text-2xl" value={note.title}/>
      <p className="mt-6">
      <textarea className=" w-full  bg-primary" placeholder="Escribe el contenido de tu nota" value={note.content}>
      
      </textarea>
      </p>
      </div>
    </div>
  )
}

export default NoteContent
