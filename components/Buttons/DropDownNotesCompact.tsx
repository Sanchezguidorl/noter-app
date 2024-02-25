"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PageActiveMobile from "./PageActiveMobile";
import { useGetNotesContext } from "@/contexts/GetNotesProvider";

function DropDownNotesCompact({ icon }:{icon:React.ReactNode}) {
  const [active, setActive] = useState<boolean>(false);
  const {notesData}=useGetNotesContext();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setActive(false);
    }
  };

  useEffect(() => {
if(active){
    document.addEventListener("click", handleClickOutside);
}
    return () => document.removeEventListener("click", handleClickOutside);
  }, [active]);

  return (
    <div
      className="relative uppercase"
      ref={dropdownRef}
      onClick={() => setActive(!active)}
    >
          <PageActiveMobile icon={icon} currentUrl={'notas'}/>
          <div className={`overflow-hidden text-secondary-text absolute top-full w-44 -right-3/4 z-30 bg-base rounded-br-md rounded-bl-md text-xs border mt-2 border-secondary-text border-t-0 transition-all duration-300  ${
          active ? "max-h-500 px-1 py-2" : "max-h-0 p-0 border-none"
        }`}>
      <ul
        className={` `}
      >
        <li className=" hover:bg-secondary-text hover:text-primary">
          <Link href={`/notas/agregar`}>Agregar nuevas notas</Link>
        </li>
        {notesData.length > 0 &&
          notesData.map((note) => (
            <Link key={note.id} href={`/notas/${note.id}`}>
              <li className=" uppercase mt-1 border-t-2 py-1 border-secondary-text hover:bg-secondary-text hover:text-primary">{note.title.length>20?note.title.slice(0,20)+" ...":note.title}</li>
            </Link>
          ))}
      </ul>
      </div>
    </div>
  );
}

export default DropDownNotesCompact;
