"use client";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useGetNotesContext } from "@/contexts/GetNotesProvider";
import ResultsNotesData from "./ResultsNotesData";

function SearchDataInput() {
  const [noteSearch, setNoteSearch] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const {notesData, refreshData}=useGetNotesContext();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNoteSearch(event.target.value);
  };

const getData=async()=>{
try {
  await refreshData();

  return;
} catch (error) {
  console.log(error);
}
};

  useEffect(()=>{
if(active){
  getData();
}
  },[active]);

  return (
    <label htmlFor="SearchInput" className=" h-10 items-center text-base bg-white flex gap-1 rounded-full px-3 mx-2 mb-3 cursor-pointer relative" >
      <SearchIcon />
      <input 
        onChange={handleChange} 
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        id="SearchInput" 
        type="text" 
        placeholder="Buscar" 
        className={`rounded-full w-full cursor-pointer text-xs ${active ? 'active' : ''}`} 
      />
{
  active &&
  <ResultsNotesData data={notesData} input={noteSearch} bgColor={"bg-white"}/>
}
    </label>
  );
}

export default SearchDataInput;
