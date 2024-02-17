"use client";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

function SearchDataInput({ data }: { data: { title: string; id: string }[] }) {
  const [noteSearch, setNoteSearch] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNoteSearch(event.target.value);
  };

  return (
    <label
      htmlFor="SearchInput"
      className=" h-10 items-center text-base bg-white flex gap-1 rounded-full px-3 mx-2 mb-3 cursor-pointer relative"
    >
      {""}
      <SearchIcon />
      <input
        onChange={handleChange}
        id="SearchInput"
        type="text"
        placeholder="Buscar"
        className="rounded-full w-full cursor-pointer text-xs"
      />
      <ul className="absolute bg-white h-fit w-[90%] z-40 left-0 top-8 ml-2 text-black">
        {data
          .filter((note) => noteSearch && (note.title?.toLowerCase().includes(noteSearch.toLowerCase())&& noteSearch!==""))
          .map((filteredNote) => (
            <Link key={filteredNote.id} href={`/notas/${filteredNote.id}`}>
            <li className="px-2 py-1 uppercase text-xs">{filteredNote.title}</li>
            </Link>
          ))}
      </ul>
    </label>
  );
}

export default SearchDataInput;
