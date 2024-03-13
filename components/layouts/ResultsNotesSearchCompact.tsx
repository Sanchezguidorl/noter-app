import { NoteI } from "@/app/db/dbMock"
import Link from "next/link"

function ResultsNotesSearchCompact({data, clases, input, }:{data:NoteI[], clases:string,input:string} ) {
  return (
            <ul className={`absolute h-fit z-30 left-0 top-full ml-2 bg-base ${clases}`}>
        {data
          .filter((note) => input && (note.title?.toLowerCase().includes(input.toLowerCase())&& input!==""))
          .map((filteredNote) => (
            <li key={filteredNote.id} className="px-2 py-1 uppercase text-xs border-b-2 hover:bg-secondary-text">
              <Link className="w-full" href={`/notas/${filteredNote.id}`}>
              
              {filteredNote.title.slice(0,22)}
            </Link>
              </li>
          ))}
      </ul>      
  )
}

export default ResultsNotesSearchCompact;
