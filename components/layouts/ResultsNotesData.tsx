import { NoteI } from "@/app/db/dbMock"
import Link from "next/link"

function ResultsNotesData({data, bgColor, input}:{data:NoteI[], bgColor:string,input:string} ) {
  return (
            <ul className={`absolute h-fit w-[90%] z-30 left-0 top-8 ml-2 text-black ${bgColor}`}>
        {data
          .filter((note) => input && (note.title?.toLowerCase().includes(input.toLowerCase())&& input!==""))
          .map((filteredNote) => (
            <Link key={filteredNote.id} href={`/notas/${filteredNote.id}`}>
            <li className="px-2 py-1 uppercase text-xs border-b-2">{filteredNote.title.slice(0,42)}</li>
            </Link>
          ))}
      </ul>      
  )
}

export default ResultsNotesData
