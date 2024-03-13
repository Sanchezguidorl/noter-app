import { NoteI } from "@/app/db/dbMock"
import Link from "next/link"

function ResultsNotesData({data, clases, input, }:{data:NoteI[], clases:string,input:string} ) {
  return (
            <ul className={`absolute h-fit z-40 left-0 top-8 ml-2 ${clases}`}>
        {data
          .filter((note) => input && (note.title?.toLowerCase().includes(input.toLowerCase())&& input!==""))
          .map((filteredNote) => (
            <li key={filteredNote.id} className="px-2 py-1 uppercase text-xs border-b-2 hover:bg-secondary-text hover:text-white">
              <Link className="w-full" href={`/notas/${filteredNote.id}`}>
              
              {filteredNote.title.slice(0,42)}
            </Link>
            </li>
          ))}
      </ul>      
  )
}

export default ResultsNotesData
