import DeleteIcon from "@mui/icons-material/Delete";
import DropDownNotesCompact from "../Buttons/DropDownNotesCompact";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import AddButton from "../Buttons/AddButton";
import SearchButton from "../Buttons/SearchButton";
import DropDownNotebooksCompact from "../Buttons/DropDownNotebooksCompact";
import PageActiveMobile from "../Buttons/PageActiveMobile";
import DescriptionIcon from '@mui/icons-material/Description';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

async function NavCompact() {
  const getNotebooks=await fetch("http://localhost:3000/api/libretas",{cache:'no-store'});

  const notebooksData= await getNotebooks?.json();

  const getNotes=await fetch("http://localhost:3000/api/notas",{cache:'no-store', next:{revalidate:10}}).catch(() =>
  console.log("llegaste aca")
);

  const notesData = await getNotes?.json();
 
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
          icon={<DescriptionIcon fontSize="small" />}
          listItems={notesData}
        />

      <DropDownNotebooksCompact
          itemCategoryName={notebooksData.itemCategoryName}
          icon={<CollectionsBookmarkIcon fontSize="small" />}
          listItems={notebooksData}
  />
        <Link href={"/papelera"}>
          <DeleteIcon fontSize="small" className="hover:text-primary-buttons" />
        </Link>
      </div>
    </div>
  );
}

export default NavCompact;
