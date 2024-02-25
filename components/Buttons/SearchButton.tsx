'use client';
import { useGetNotesContext } from '@/contexts/GetNotesProvider';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useRef, useState } from 'react';
import ResultsNotesSearchCompact from '../layouts/ResultsNotesSearchCompact';

function SearchButton(){
const [activeSearch, setActveSearch]= useState<boolean>(false)
const [noteSearch,setNoteSearch] = useState<string>("");
const {notesData}=useGetNotesContext();
const refElement=useRef<HTMLDivElement>(null)


const handleClickOutside=(event:MouseEvent)=>{
  if(!refElement.current?.contains(event.target as Node)){
    setActveSearch(false);}
}

const handleChangeNoteSearch=(event:React.ChangeEvent<HTMLInputElement>) => {
  setNoteSearch(event.target.value);
};

useEffect(()=>{
 
if(activeSearch){
  document.addEventListener("click",handleClickOutside)
}

return ()=>document.removeEventListener("click",handleClickOutside)
},[activeSearch]);

  return (
    <div className="flex items-center border-b-2 relative" ref={refElement}>
        <div className=' p-1' onClick={()=>setActveSearch(!activeSearch)}>
    <SearchIcon fontSize="small" />
    </div>
    <label htmlFor="SearchInputCompact" className={`overflow-hidden text-white transition-all duration-300 ${activeSearch ?  'w-28 pl-2 ': 'w-0 p-0'}`}>{""}
    <input id="SearchInputCompact" className="bg-base" type="text" onChange={handleChangeNoteSearch} />
    </label>
    {activeSearch && (
        <ResultsNotesSearchCompact
          data={notesData}
          input={noteSearch}
          clases={" w-[90%]"}
        />)}
    </div>
  )
}

export default SearchButton;
