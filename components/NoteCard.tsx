"use client";
import { NoteI } from "@/app/db/dbMock";
import "../styles/NoteCard.css";
import Link from "next/link";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteNotesPanelContext } from "@/contexts/DeleteNotesPanelContext";
import { readDate } from "@/app/utils/utils";

function NoteCard({id, content, date,title}:NoteI) {
const {deleteCards}= useDeleteNotesPanelContext();
  
  return (
    <Link href={`/notas/${id}`}>
    <div
      id="NoteCard"
      className=" bg-primary h-full max-h-full w-40 min-w-40 rounded-xl p-2 relative"
    >
{deleteCards &&
      <DeleteIcon className="absolute right-3 bottom-2 z-10 text-button-action hover:text-delete-hover" fontSize="small"/>
      }
      <p>{title}</p>
      <div className="content-card overflow-y-hidden h-36">
        <p className="text-sm">
{content}
        </p>
      </div>
      <p className=" text-secondary-text absolute bottom-2">{readDate(date)}</p>
    </div>
    </Link>
  );
}

export default NoteCard;
