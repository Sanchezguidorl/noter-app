import AssignmentIcon from "@mui/icons-material/Assignment";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import AddButtonDropDown from "../Buttons/AddButtonDropDown";
import DropDownNotebook from "../Buttons/DropDownNotebook";
import DropDownNotes from "../Buttons/DropDownNotes";
import SearchDataInput from "./SearchDataInput";

async function NavComponent() {
  return (
    <div className=" sm:w-1/3 md:w-1/4 max-w-48 py-4 hidden sm:flex flex-col gap-2 font-semibold text-xs border-interactive border-r-2">
      <div className="px-2 text-xs ">
          <SearchDataInput />
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
              <DropDownNotebook
                icon={<CollectionsBookmarkIcon fontSize="small" />}
                itemCategoryName={"Libretas"}
              />
          </li>
          <li className="relative flex flex-col justify-center">
              <DropDownNotes icon={<DescriptionIcon fontSize="small" />} />
          </li>
          <Link href={"/tareas"} className="">
            <li className="h-10 flex items-center gap-1 hover:bg-primary  pl-6 cursor-pointer uppercase">
              <AssignmentIcon fontSize="small" /> Tareas
            </li>
          </Link>
          <Link href={"/papelera"} className="">
            <li className="h-10 flex items-center gap-1 hover:bg-primary  pl-6 cursor-pointer uppercase">
              <DeleteIcon fontSize="small" /> Papelera
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default NavComponent;
