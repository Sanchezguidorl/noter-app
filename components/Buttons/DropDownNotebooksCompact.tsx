"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PageActiveMobile from "./PageActiveMobile";
import { useGetNotebooksContext } from "@/contexts/GetNotebooksContext";

function DropDownNotebooksCompact({ icon }: { icon: React.ReactNode }) {
  const [active, setActive] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notebooksData, refresh } = useGetNotebooksContext();

  const getData = async () => {
    try {
      await refresh();

      return;
    } catch (error) {}
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setActive(false);
    }
  };

  useEffect(() => {
    if (active) {
      document.addEventListener("click", handleClickOutside);
      getData();
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [active]);

  return (
    <div
      className="relative uppercase"
      ref={dropdownRef}
      onClick={() => setActive(!active)}
    >
      <PageActiveMobile icon={icon} currentUrl={"libretas"} />
      <div       className={` text-secondary-text overflow-hidden absolute top-full w-44 -right-3/4 z-30 bg-base rounded-br-md rounded-bl-md text-xs border mt-2 border-secondary-text border-t-0 transition-all duration-300  ${
          active ? "max-h-500 px-1 py-2" : "max-h-0 p-0 border-none"
        }`}>
      <ul
      >
        <li className="  hover:bg-secondary-text hover:text-primary">
          <Link href={`/notes/agregar`}>Agregar nuevas libretas</Link>
        </li>
        {notebooksData.length > 0 &&
          notebooksData.map((notebook) => (
            <Link key={notebook.id} href={`/libretas/${notebook.id}`}>
              <li className="uppercase mt-1 border-t-2 py-1 border-secondary-text hover:bg-secondary-text hover:text-primary">{notebook.title.length>20? notebook.title.slice(0,20)+" ...": notebook.title}</li>
            </Link>
          ))}
      </ul>
      </div>
    </div>
  );
}

export default DropDownNotebooksCompact;
