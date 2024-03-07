"use client";
import {useEffect} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { redirect } from "next/navigation";

function Papelera() {
  useEffect(()=>{
    redirect('/not-found');
  },[])
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex justify-center items-center">
        <DeleteIcon className="text-3xl xs:text-5xl sm:text-7xl" />
        <p className=" text-xl xs:text-2xl sm:text-3xl md:text-4xl">
          La papelera se encuentra vacía
        </p>
      </div>
    </div>
  );
}

export default Papelera;
