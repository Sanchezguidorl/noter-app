"use client";
import "../../styles/layouts/SquareOptions.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./DialogOptions";
import { useState } from "react";

function SquareOptions() {
const [isActive,setIsActive]= useState<boolean>(false);


  return (
    <div className="flex flex-col justify-center items-end">
      <MoreHorizIcon onClick={()=>setIsActive(!isActive)} className={`cursor-pointer ${isActive && 'more-options-active'}`} />
      <div className="dialog-container relative z-10 hidden ">
        <div className="dialog absolute -top-2 right-1"></div>
        <div className="bg-primary rounded-sm p-2 ">
          <div className="text-center text-xs">
          </div>
        </div>
      </div>
    </div>
  );
}

export default SquareOptions;
