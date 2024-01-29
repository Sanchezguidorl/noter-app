import DeleteIcon from "@mui/icons-material/Delete";
import DropDownNotesCompact from "../Buttons/DropDownNotesCompact";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import AddButton from "../Buttons/AddButton";
import SearchButton from "../Buttons/SearchButton";
import { dbMockNotebooks, dbMockNotes } from "@/app/db/dbMock";
import DropDownNotebooksCompact from "../Buttons/DropDownNotebooksCompact";
import PageActiveMobile from "../Buttons/PageActiveMobile";

function NavCompact() {
  const notebooksData = dbMockNotebooks;

  const notesData = dbMockNotes;
  return (
    <div className="w-full sm:hidden px-4  py-4 bg-base">
      <div className="flex justify-between items-center">
        <SearchButton />
        <div className="relative">
          <AddButton />
        </div>
        <Link href={"/"}>
          <PageActiveMobile icon={<HomeIcon/>} currentUrl={''}/>
        </Link>
        <DropDownNotesCompact
          icon={notesData.icon}
          listItems={notesData.listItems}
        />

      <DropDownNotebooksCompact
          itemCategoryName={notebooksData.itemCategoryName}
          icon={notebooksData.icon}
          listItems={notebooksData.listItems}
  />
        <Link href={"/papelera"}>
          <DeleteIcon fontSize="small" className="hover:text-primary-buttons" />
        </Link>
      </div>
    </div>
  );
}

export default NavCompact;
