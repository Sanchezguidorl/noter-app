"use client";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import DescriptionIcon from "@mui/icons-material/Description";
import Link from "next/link";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { NotebookDataI } from "@/app/db/dbMock";

function NotebookDropDown({ title, id, notes }: NotebookDataI) {
  const [showNotes, setShowNotes] = useState<boolean>(false);

  return (
    <div className="">
      <div
        className="flex py-3 bg-primary hover:brightness-125 cursor-pointer"
        onClick={() => setShowNotes(!showNotes)}
      >
        <ArrowDropDownIcon
          className={`transition-all duration-100 ${
            !showNotes && "-rotate-90"
          }`}
        />
        <CollectionsBookmarkIcon />
        <p>{title}</p>
      </div>
      <ul
        className={`pl-4 pt-2 text-sm text-secondary-text ${
          !showNotes && "h-0 overflow-hidden"
        }`}
      >
        {notes.map((note) => (
          <li key={note.noteId} className="p-1  border-b">
            <Link href={`/notas/${note.noteId}`}>
              <DescriptionIcon />
              {note.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotebookDropDown;
