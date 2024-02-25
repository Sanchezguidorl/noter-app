"use client";
import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useGetNotesContext } from "@/contexts/GetNotesProvider";
import ResultsNotesData from "./ResultsNotesData";

function SearchDataInput() {
  const [noteSearch, setNoteSearch] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const { notesData } = useGetNotesContext();
  const inputRef= useRef<HTMLInputElement>(null);

  const handleClickOutSide = (event: MouseEvent) => {

    if (!inputRef.current?.contains(event.target as Node)) {
      setActive(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNoteSearch(event.target.value);
  };

  useEffect(() => {
    if (active) {
      document.addEventListener("click", handleClickOutSide);
    }

    return () => document.removeEventListener("click", handleClickOutSide);
  }, [active]);

  return (
    <label
      htmlFor="SearchInput"
      className=" h-10 items-center text-base bg-white flex gap-1 rounded-full px-3 mx-2 mb-3 cursor-pointer relative"
    >
      <SearchIcon />
      <input
        ref={inputRef}
        onChange={handleChange}
        onFocus={() => setActive(true)}
        id="SearchInput"
        type="text"
        placeholder="Buscar"
        className={`rounded-full w-full cursor-pointer text-xs ${
          active ? "active" : ""
        }`}
      />
      {active && (
        <ResultsNotesData
          data={notesData}
          input={noteSearch}
          clases={"bg-white w-[90%]"}
        />
      )}
    </label>
  );
}

export default SearchDataInput;
