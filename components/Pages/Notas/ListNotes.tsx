"use client";
import NoteCardPrevisualization from "./NoteCardPrevisualization";
import SortIcon from "@mui/icons-material/Sort";
import DescriptionIcon from "@mui/icons-material/Description";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { NoteI } from "@/app/db/dbMock";
import { useGetNotesContext } from "@/contexts/GetNotesProvider";
import AddIcon from '@mui/icons-material/Add';

function ListNotes({id,selectId}:{id:string|undefined, selectId:(id:string)=>void}) {
  const [showCards, setShowCards] = useState<boolean>(false);
  const {notesData}=useGetNotesContext();
  return (
    <div className={`bg-base h-fit w-full sm:w-80 p-1 pt-6`}>
      <div>
        <div className="flex gap-1 relative">
          <DescriptionIcon fontSize="large" />
          <h1 className=" text-3xl mb-3">Notas</h1>
        </div>
        <div className="flex justify-between px-2 text-secondary-text">
          <p className="text-xs ">{notesData?.length} notas</p>
          <SortIcon />
        </div>
        <div className="flex mt-3 text-secondary-text border-b border-interactive pb-2">
          {notesData.length > 0 && (
            <div
              className="flex items-center cursor-pointer select-none"
              onClick={() => setShowCards(!showCards)}
            >
              <ArrowDropDownIcon
                className={` right-4 transition-all duration-200 ${
                  showCards && "-rotate-90"
                }`}
              />
              <p className="text-xs ">
                {!showCards ? "Ocultar notas" : "Ver notas"}
              </p>
            </div>
          )}
        </div>
      </div>
      <div
        className={`overflow-auto transition-all duration-300 ${
          showCards ? "max-h-0" : "max-h-600"
        }`}
      >
        <div className="flex gap-1 text-sm text-secondary-text items-center my-2 p-1 cursor-pointer hover:brightness-125" onClick={()=>selectId("agregar")}>
          <AddIcon/>
          <p>Nueva nota</p>
        </div>
        {notesData?.map((item: NoteI) => (
          <NoteCardPrevisualization
            selectId={selectId}
            key={item.id}
            title={item.title}
            date={item.date}
            content={item.content}
            id={item.id}
            selected={item.id===id}
          />
        ))}
      </div>
    </div>
  );
}

export default ListNotes;
