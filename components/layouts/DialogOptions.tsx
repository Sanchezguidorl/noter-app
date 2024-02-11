"use client";
import "../../styles/layouts/SquareOptions.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./DialogOptions";
import { useState } from "react";
import { useDeleteNotesPanelContext } from "@/contexts/DeleteNotesPanelContext";
import Link from "next/link";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

function SquareOptions() {
const [isActive,setIsActive]= useState<boolean>(false);
const {deleteCards,setDeleteCards}=useDeleteNotesPanelContext();
  return (
    <div className="flex flex-col justify-center items-end">
      <MoreHorizIcon onClick={()=>setIsActive(!isActive)} className={`cursor-pointer ${isActive && 'more-options-active'}`} />
      <div className="dialog-container relative z-10 hidden ">
        <div className="dialog absolute -top-2 right-1"></div>
        <div className="bg-primary rounded-sm py-2 ">
        <Link href={"/notas/agregar"}>
          <div className="text-center text-xs p-1 hover:bg-secondary-text">
            Agregar nueva nota
          </div>
          </Link>
          <div onClick={()=>((setDeleteCards!==null && deleteCards!==null)&& setDeleteCards(!deleteCards))} className="text-center text-xs cursor-pointer p-1 hover:bg-secondary-text">
            Eliminar notas <RadioButtonCheckedIcon className={` text-primary-buttons transition-all duration-200 ${deleteCards ? "opacity-100": "opacity-0"}`}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SquareOptions;
