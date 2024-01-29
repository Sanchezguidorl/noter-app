'use client';
import NoteCardPrevisualization, {
  NoteInterface,
} from "./NoteCardPrevisualization";
import SortIcon from "@mui/icons-material/Sort";
import DescriptionIcon from "@mui/icons-material/Description";
import { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function ListNotes({ list }:{list:NoteInterface[]}) {
const [showCards, setShowCards]= useState<boolean>(false);


  return (
    <div className={`bg-base h-fit w-full sm:w-80 p-2 pt-6`}>
      <div>
        <div className="flex gap-1 relative">
          <DescriptionIcon fontSize="large" />
          <h1 className=" text-3xl mb-3">Notas</h1>
        </div>
        <div className="flex justify-between px-2 text-secondary-text">
          <p className="text-xs ">{list.length} notas</p>
          <SortIcon />
        </div>
        <div className="flex mt-3 text-secondary-text border-b border-interactive pb-2">
<div className="flex items-center cursor-pointer select-none" onClick={()=>setShowCards(!showCards)}>
<ArrowDropDownIcon className={` right-4 transition-all duration-200 ${showCards && '-rotate-90'}`}/>
        <p className="text-xs ">{!showCards ? 'Ocultar notas': 'Ver notas'}</p>
</div>
        </div>
      </div>
      <div className={`overflow-auto max-h-600 ${showCards && 'h-0 overflow-hidden'}`}>
      {list.map((item: NoteInterface) => (
        <NoteCardPrevisualization
          key={item.itemId}
          title={item.title}
          date={item.date}
          content={item.content}
          itemId={item.itemId}
        />
      ))}
      </div>
    </div>
  );
}

export default ListNotes;
