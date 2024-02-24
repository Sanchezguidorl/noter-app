import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Papelera() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex justify-center items-center">
        <DeleteIcon className="text-3xl xs:text-5xl sm:text-7xl" />
        <p className=" text-xl xs:text-2xl sm:text-3xl md:text-4xl">
          La papelera está vacía
        </p>
      </div>
    </div>
  );
}

export default Papelera;
