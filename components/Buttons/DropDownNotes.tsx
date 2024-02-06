"use client";
import { useState } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { NoteI, NotesDataI } from "@/app/db/dbMock";

function DropDownNotes({ listItems, icon }: NotesDataI) {
  const [active, setActive] = useState<boolean>(false);

  const renderedListItems =
    listItems.length > 0 ? (
      listItems.map((note: NoteI) => (
        <Link href={`/notas/${note.id}`} key={note.id}>
          <li className="px-2 py-1 text-xxs hover:brightness-125 cursor-pointer uppercase">
            <LibraryBooksIcon fontSize="small" />
            {note.title}
          </li>
        </Link>
      ))
    ) : (
      <></>
    );

  return (
    <>
      <div
        onClick={() => setActive(!active)}
        className="relative h-10 gap-1 flex items-center hover:bg-primary  pl-6 cursor-pointer uppercase"
      >
        {icon}
        Notas
        {listItems.length > 0 && (
          <ArrowDropDownIcon
            className={`absolute left-0 duration-500 cursor-pointer ${
              active ? "" : "-rotate-90"
            } transition-all duration-200`}
          />
        )}
      </div>
      <ul
        className={`pl-6 text-primary-buttons overflow-hidden ${
          active ? "max-height-500" : "max-h-0"
        } transition-all duration-300`}
      >
        <li className="px-2 py-1 hover:brightness-125 cursor-pointer uppercase text-xxs">
          <Link className="flex items-center" href={`/notas/agregar`}>
            <AddIcon />
            <div>Nueva nota</div>
          </Link>
        </li>
        {renderedListItems}
      </ul>
    </>
  );
}

export default DropDownNotes;
