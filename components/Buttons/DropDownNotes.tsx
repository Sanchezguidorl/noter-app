"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { NoteI } from "@/app/db/dbMock";
import { useGetNotesContext } from "@/contexts/GetNotesProvider";

function DropDownNotes({ icon }: {icon:ReactNode}) {
  const [active, setActive] = useState<boolean>(false);
  const { notesData } = useGetNotesContext();
  const dropDownRef=useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropDownRef.current?.contains(event.target as Node)) {
        setActive(false);
}
};

    if (active) {
      document.addEventListener("click",handleClickOutside);
    }
  }, [active]);

  return (
    <>
      <div ref={dropDownRef}
        onClick={() => setActive(!active)}
        className="relative h-10 gap-1 flex items-center hover:bg-primary  pl-6 cursor-pointer uppercase"
      >
        {icon}
        Notas
        <ArrowDropDownIcon
          className={`absolute left-0 duration-500 cursor-pointer ${
            active ? "" : "-rotate-90"
          } transition-all duration-200`}
        />
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${active ? "max-h-96" : "max-h-0"}`}>
      <ul
        className={`pl-6 text-button-action`}
      >
        <li className="px-2 py-1 hover:brightness-125 cursor-pointer uppercase text-xxs">
          <Link className="flex items-center" href={`/notas/agregar`}>
            <AddIcon />
            <div>Nueva nota</div>
          </Link>
        </li>
        {notesData.length > 0 ? (
          notesData.map((note: NoteI) => (
            <Link href={`/notas/${note.id}`} key={note.id}>
              <li className="px-2 py-1 text-xxs hover:brightness-125 cursor-pointer uppercase text-nowrap text-ellipsis overflow-hidden">
                <LibraryBooksIcon fontSize="small" />
                {note.title}
              </li>
            </Link>
          ))
        ) : (
          <></>
        )}
      </ul>
      </div>
    </>
  );
}

export default DropDownNotes;
