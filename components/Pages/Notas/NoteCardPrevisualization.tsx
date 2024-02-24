import { NoteI } from "@/app/db/dbMock";
import { readDate } from "@/app/utils/utils";
import Link from "next/link";

function NoteCardPrevisualization({ date, id, content, title, selected }:{ date:number, id:string, content:string, title:string, selected:boolean}) {
  return (
    <Link href={`/notas/${id}`}>
      <div className={`border  ${selected ? "border-button-action":  "border-primary border-l-0 border-r-0"} m-1 p-1 text-secondary-text h-44 break-words flex flex-col justify-between`}>
        <div>
          <h2 className="text-white">{title.substring(0, 30)}</h2>
          <p className="text-sm mt-1">
            {content.substring(0, 90)}
            {content.length > 110 && "..."}
          </p>
        </div>
        <p className="text-xs py-2">{readDate(date)}</p>
      </div>
    </Link>
  );
}

export default NoteCardPrevisualization;
