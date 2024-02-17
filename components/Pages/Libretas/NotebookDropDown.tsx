import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import DescriptionIcon from "@mui/icons-material/Description";
import Link from "next/link";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { NotebookI } from "@/app/db/dbMock";
import DeleteIcon from '@mui/icons-material/Delete';
import { useGetNotebooksContext } from "@/contexts/GetNotebooksContext";
import AddIcon from '@mui/icons-material/Add';

function NotebookDropDown({ notebook }: {notebook:NotebookI}) {
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const {refresh}=useGetNotebooksContext();

  const handleDelete=async(id?:string)=>{
    try {
      const notebookDeleted= await fetch(`http://localhost:3000/api/libretas?id=${id}`,{
        method:"DELETE"
      });

      if(notebookDeleted){
        await refresh();
      }

      return;
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="">
      <div
        className="flex py-3 mt-2 bg-primary hover:brightness-125 cursor-pointer"
        onClick={() =>setShowNotes(!showNotes)}
      >
        <ArrowDropDownIcon
          className={`transition-all duration-100 ${
            !showNotes && "-rotate-90"
          }`}
        />
        <CollectionsBookmarkIcon />
        <p className="w-full select-none">{notebook.title}</p>
        <DeleteIcon fontSize="small" onClick={()=>{handleDelete(notebook?.id)}} className="mr-3 cursor-pointer hover:text-delete-hover"/>
      </div>
      <ul
        className={`pl-4 mt-2 text-sm text-secondary-text ${
          !showNotes && "h-0 overflow-hidden"
        }`}
      >
        <li className="p-1 font-bold  border-b cursor-pointer hover:brightness-150">
              <AddIcon />
              Agregar una nota
          </li>
        {notebook.notes.map((note) => (
          <li key={note.id} className="p-1  border-b hover:brightness-125">
            <Link href={`/notas/${note.id}`}>
              <DescriptionIcon />
              {note.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotebookDropDown;
