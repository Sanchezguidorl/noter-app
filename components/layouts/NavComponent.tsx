import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import DropDownNotebook from "../Buttons/DropDownNotebook";
import Link from "next/link";
import AddButtonDropDown from "../Buttons/AddButtonDropDown";
import { dbMockNotebooks, dbMockNotes } from "@/app/db/dbMock";
import DropDownNotes from "../Buttons/DropDownNotes";

function NavComponent() {
  const notebooksData =dbMockNotebooks;

  const notesData =dbMockNotes;

  return (
    <div className=" sm:w-1/3 md:w-1/4 max-w-48 py-4 hidden sm:flex flex-col gap-2 font-semibold text-xs border-interactive border-r-2">
      <div className="px-2 text-xs ">
        <label
          htmlFor="SearchInput"
          className=" h-10 items-center text-base bg-white flex gap-1 rounded-full px-3 mx-2 mb-3 cursor-pointer"
        >
          {""}
          <SearchIcon />
          <input
            id="SearchInput"
            type="text"
            placeholder="Buscar"
            className="rounded-full w-full cursor-pointer"
          />
        </label>
        <AddButtonDropDown />
      </div>
      <nav>
        <ul className=" text-secondary-text">
          <li className="h-10 flex items-center hover:bg-primary  pl-6 cursor-pointer uppercase">
            <Link href={"/"} className="flex items-center gap-1">
              <HomeIcon /> Inicio
            </Link>
          </li>
          <li className="relative flex flex-col justify-center">
            <DropDownNotebook
              icon={notebooksData.icon}
              itemCategoryName={notebooksData.itemCategoryName}
              listItems={notebooksData.listItems}
            />
          </li>
          <li className="relative flex flex-col justify-center">
            <DropDownNotes
              icon={notesData.icon}
              listItems={notesData.listItems}
            />
          </li>
          <li className="h-10 hover:bg-primary  pl-6 cursor-pointer uppercase flex items-center">
            <Link href={"/papelera"} className="gap-1 flex items-center">
              <DeleteIcon /> Papelera
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavComponent;
