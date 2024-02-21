import DeleteIcon from "@mui/icons-material/Delete";
import DropDownNotesCompact from "../Buttons/DropDownNotesCompact";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import AddButton from "../Buttons/AddButton";
import SearchButton from "../Buttons/SearchButton";
import DropDownNotebooksCompact from "../Buttons/DropDownNotebooksCompact";
import PageActiveMobile from "../Buttons/PageActiveMobile";
import DescriptionIcon from "@mui/icons-material/Description";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import { NotebookI } from "@/app/db/dbMock";
import GetNotesProvider from "@/contexts/GetNotesProvider";
import GetNotebooksContext from "@/contexts/GetNotebooksContext";

async function NavCompact() {
  return (
    <div className="w-full sm:hidden px-4  py-4 bg-base">
      <div className="flex justify-between items-center">
        <SearchButton />
        <div className="relative">
          <AddButton />
        </div>
        <Link href={"/"}>
          <PageActiveMobile icon={<HomeIcon />} currentUrl={""} />
        </Link>
        <GetNotesProvider>
          <DropDownNotesCompact icon={<DescriptionIcon fontSize="small" />} />
        </GetNotesProvider>
        <GetNotebooksContext>
          <DropDownNotebooksCompact
            icon={<CollectionsBookmarkIcon fontSize="small" />}
          />
        </GetNotebooksContext>
        <Link href={"/papelera"}>
          <DeleteIcon fontSize="small" className="hover:text-primary-buttons" />
        </Link>
      </div>
    </div>
  );
}

export default NavCompact;
