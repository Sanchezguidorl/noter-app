import DeleteIcon from "@mui/icons-material/Delete";
import DropDownItemNavCompact from "./../Buttons/DropDownItemNavCompact";
import Link from "next/link";
import HomeButton from "./../Buttons/HomeButton";
import AddButton from "../Buttons/AddButton";
import SearchButton from "../Buttons/SearchButton";
import { dbMockNotebooks, dbMockNotes } from "@/app/db/dbMock";

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
          <HomeButton />
        </Link>
        <DropDownItemNavCompact
          itemCategoryName={notesData.itemCategoryName}
          icon={notesData.icon}
          linkAdd={notesData.linkAdd}
          listItems={notesData.listItems}
        />

        <DropDownItemNavCompact
          itemCategoryName={notebooksData.itemCategoryName}
          icon={notebooksData.icon}
          linkAdd={notebooksData.linkAdd}
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
