'use client';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

function SearchButton() {
const [activeSearch, setActveSearch]= useState<boolean>(false)

  return (
    <div className="flex items-center border-b-2" >
        <div className=' p-1' onClick={()=>setActveSearch(!activeSearch)}>
    <SearchIcon fontSize="small" />
    </div>
    <label htmlFor="SearchInput" className={`overflow-hidden text-white transition-all duration-300 ${activeSearch ?  'w-28 pl-2 ': 'w-0 p-0'}`}>{""}
    <input id="SearchInput" className="bg-base" type="text" />
    </label>
    </div>
  )
}

export default SearchButton
