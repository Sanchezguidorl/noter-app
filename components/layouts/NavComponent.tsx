import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import NotesIcon from '@mui/icons-material/Notes';

function NavComponent() {
  return (
    <div className=" sm:w-1/3 md:w-1/4 max-w-40 py-4 hidden sm:flex flex-col gap-2 font-semibold text-xs">
      <div className="px-2 text-xs">
        <label htmlFor="SearchInput" className=" h-10 items-center text-base bg-white flex gap-1 rounded-full px-3 mx-2 mb-3 cursor-pointer">
          <SearchIcon />
          <input 
            id="SearchInput"
            type="text"
            placeholder="Buscar"
            className="rounded-full w-full cursor-pointer"
          />
        </label>
        <div className=" h-10 items-center text-xs bg-primary-buttons flex gap-1 rounded-full px-3 mx-2 cursor-pointer text-primary hover:brightness-125 hover:text-secondary-text duration-300">
          <AddIcon /> Nuevas notas
        </div>
      </div>
      <nav>
        <ul className=" text-secondary-text">
          <li className="h-10 gap-1 flex items-center hover:bg-primary  pl-6 cursor-pointer">
            <HomeIcon /> Inicio
          </li>
          <li className="relative flex flex-col justify-center">
            <div className="relative h-10 gap-1 flex items-center hover:bg-primary  pl-6 cursor-pointer">
              <CollectionsBookmarkIcon /> Libretas
              <ArrowDropDownIcon
                className="absolute left-0 duration-500 -rotate-90 cursor-pointer"
              />
            </div>
            <ul className="pl-12 overflow-hidden text-primary-buttons">
              <li className="px-2 py-1 text-sm hover:brightness-125 cursor-pointer"><LibraryBooksIcon fontSize="small"/> Hola</li>
              <li className="px-2 py-1 text-sm hover:brightness-125 cursor-pointer"><LibraryBooksIcon fontSize="small"/> Hola</li>
              <li className="px-2 py-1 text-sm hover:brightness-125 cursor-pointer"><LibraryBooksIcon fontSize="small"/> Hola</li>
            </ul>
          </li>
          <li className="relative flex flex-col justify-center">
            <div className="relative h-10 gap-1 flex items-center hover:bg-primary  pl-6 cursor-pointer">
              <DescriptionIcon /> Notas
              <ArrowDropDownIcon
                className="absolute left-0 duration-500 -rotate-90 cursor-pointer"
              />
            </div>
            <ul className="pl-12 overflow-hidden text-primary-buttons">
              <li className="px-2 py-1 text-sm hover:brightness-125 cursor-pointer"><NotesIcon fontSize="small"/> Hola</li>
              <li className="px-2 py-1 text-sm hover:brightness-125 cursor-pointer"><NotesIcon fontSize="small"/> Hola</li>
              <li className="px-2 py-1 text-sm hover:brightness-125 cursor-pointer"><NotesIcon fontSize="small"/> Hola</li>
            </ul>
          </li>
          <li className="h-10 gap-1 flex items-center hover:bg-primary  pl-6 cursor-pointer">
            <DeleteIcon /> Papelera
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavComponent;
