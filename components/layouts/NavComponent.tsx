import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import DropDownNotebook from "../Buttons/DropDownNotebook";
import Link from "next/link";
import AddButtonDropDown from "../Buttons/AddButtonDropDown";
import DropDownNotes from "../Buttons/DropDownNotes";
import DescriptionIcon from "@mui/icons-material/Description";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import SearchDataInput from "./SearchDataInput";

async function NavComponent() {
  const getNotebooks = await fetch("http://localhost:3000/api/libretas");

  const notebooksData = await getNotebooks?.json();

  const getNotes = await fetch("http://localhost:3000/api/notas").catch(() =>
    console.log("llegaste aca")
  );

  const notesData = await getNotes?.json();

  const allData = [...notesData, ...notebooksData];

  return (
    <div className=" sm:w-1/3 md:w-1/4 max-w-48 py-4 hidden sm:flex flex-col gap-2 font-semibold text-xs border-interactive border-r-2">
      <div className="px-2 text-xs ">
        <SearchDataInput data={allData}/>
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
              listItems={notebooksData}
            />
          </li>
          <li className="relative flex flex-col justify-center">
            <DropDownNotes
              icon={<DescriptionIcon fontSize="small" />}
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
