"use client";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import DescriptionIcon from "@mui/icons-material/Description";
import Link from "next/link";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { NotebookI } from "@/app/db/dbMock";

function NotebookDropDown({ title, notes }: NotebookI) {
  const [showNotes, setShowNotes] = useState<boolean>(false);
  console.log(notes);
  return (
    <div className="">
      <div
        className="flex py-3 mt-2 bg-primary hover:brightness-125 cursor-pointer"
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
        className={`pl-4 mt-2 text-sm text-secondary-text ${
          !showNotes && "h-0 overflow-hidden"
        }`}
      >
        {notes.map((note) => (
          <li key={note.id} className="p-1  border-b">
            <Link href={`/notas/${note.id}`}>
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
