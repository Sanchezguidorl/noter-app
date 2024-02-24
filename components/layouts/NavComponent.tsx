import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from "@mui/icons-material/Home";
import DropDownNotebook from "../Buttons/DropDownNotebook";
import Link from "next/link";
import AddButtonDropDown from "../Buttons/AddButtonDropDown";
import DropDownNotes from "../Buttons/DropDownNotes";
import DescriptionIcon from "@mui/icons-material/Description";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import SearchDataInput from "./SearchDataInput";
import GetNotebooksContext from "@/contexts/GetNotebooksContext";
import GetNotesProvider from "@/contexts/GetNotesProvider";
import AssignmentIcon from '@mui/icons-material/Assignment';

async function NavComponent() {
  return (
    <div className=" sm:w-1/3 md:w-1/4 max-w-48 py-4 hidden sm:flex flex-col gap-2 font-semibold text-xs border-interactive border-r-2">
      <div className="px-2 text-xs ">
        <GetNotesProvider>
          <SearchDataInput />
        </GetNotesProvider>
        <AddButtonDropDown />
      </div>
      <nav>
        <ul className=" text-secondary-text">
          <Link href={"/"} className="">
            <li className="h-10 flex items-center gap-1 hover:bg-primary  pl-6 cursor-pointer uppercase">
              <HomeIcon /> Inicio
            </li>
          </Link>
          <li className="relative flex flex-col justify-center">
            <GetNotebooksContext>
              <DropDownNotebook
                icon={<CollectionsBookmarkIcon fontSize="small" />}
                itemCategoryName={"Libretas"}
              />
            </GetNotebooksContext>
          </li>
          <li className="relative flex flex-col justify-center">
            <GetNotesProvider>
              <DropDownNotes icon={<DescriptionIcon fontSize="small" />} />
            </GetNotesProvider>
          </li>
          <Link href={"/tareas"} className="">
            <li className="h-10 flex items-center gap-1 hover:bg-primary  pl-6 cursor-pointer uppercase">
          <AssignmentIcon fontSize="small"/> Tareas
          </li>
          </Link>
            <Link href={"/papelera"} className="gap-1 flex items-center">
          <li className="h-10 hover:bg-primary  pl-6 cursor-pointer uppercase flex items-center">
              <DeleteIcon /> Papelera
          </li>
            </Link>
        </ul>
      </nav>
    </div>
  );
}

export default NavComponent;
