'use client';

import { NotebookDropDownMenuI } from "@/app/db/dbMock";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PageActiveMobile from "./PageActiveMobile";

function DropDownNotebooksCompact({ listItems, icon }:NotebookDropDownMenuI) {
    const [active, setActive] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setActive(false);
        }
      };
  
      document.addEventListener("click", handleClickOutside);
  
      return () => document.removeEventListener("click", handleClickOutside);
    }, []);
  
    return (
      <div
        className="relative uppercase"
        ref={dropdownRef}
        onClick={() => setActive(!active)}
      >
<PageActiveMobile icon={icon} currentUrl={'libretas'}/>
        <ul
          className={` text-secondary-text overflow-hidden absolute top-full w-36 -right-3/4 z-30 bg-base rounded-br-md rounded-bl-md text-xs text-center border mt-2 border-secondary-text border-t-0 transition-all duration-300  ${
            active ? "max-h-500 px-1 py-2" : "h-0 p-0 border-none"
          }`}
        >
          <li className=" hover:text-white">
            <Link href={`/notes/agregar`}>Agregar nuevas libretas</Link>
          </li>
          {listItems.length > 0 &&
            listItems.map((notebook) => (
              <Link key={notebook.id} href={`/libretas/${notebook.id}`}>
                <li className=" hover:text-white uppercase">{notebook.title}</li>
              </Link>
            ))}
        </ul>
      </div>
    );
  }

export default DropDownNotebooksCompact
