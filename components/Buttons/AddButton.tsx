"use client";
import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

function AddButton() {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const optionsElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutClick = (event: MouseEvent) => {
      if (
        optionsElement.current &&
        !optionsElement.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("click", handleOutClick);

    return () => document.removeEventListener("click", handleOutClick);
  }, []);

  return (
    <div className="relative" ref={optionsElement}>
      <div
        className={`border-b-2 p-1 hover:border-primary-buttons ${
          showOptions && " border-base"
        }`}
      >
        <AddIcon
          className="w-6 h-6 bg-primary-buttons  rounded-full hover:text-primary-buttons hover:bg-white hover:scale-125 transition-all duration-200 cursor-pointer"
          onClick={() => setShowOptions(!showOptions)}
        />
      </div>
      <ul
        className={`absolute transition-all duration-200 overflow-hidden top-full z-30 bg-base text-xs w-40 mt-3 -left-1/2 text-secondary-text rounded-bl-md rounded-br-md border border-t-0 border-secondary-text ${
          showOptions ? " p-2 max-h-500" : "h-0 p-0 border-none"
        }`}
      >
        <li className="py-1 hover:text-white">
          <Link href={"/notas/agregar"}>
            <AddIcon /> Agregar nueva nota
          </Link>
        </li>
        <li className="py-1 hover:text-white">
          <Link href={"/tareas"}>
            <AddIcon />
            Agregar nueva tarea
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AddButton;
