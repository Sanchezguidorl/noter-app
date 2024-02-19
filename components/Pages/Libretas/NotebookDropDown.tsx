import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import DescriptionIcon from "@mui/icons-material/Description";
import Link from "next/link";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { NotebookI } from "@/app/db/dbMock";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetNotebooksContext } from "@/contexts/GetNotebooksContext";
import AddNoteToNotebook from "./AddNoteToNotebook";
import GetNotesProvider from '@/contexts/GetNotesProvider';
import { Dispatch, SetStateAction } from "react";
import CloseIcon from '@mui/icons-material/Close';

function NotebookDropDown({ notebook, showNotes, setShowNotes }: { notebook: NotebookI, showNotes:boolean, setShowNotes:Dispatch<SetStateAction<string>> }) {
  const { refresh } = useGetNotebooksContext();

  const handleDeleteNotebook = async (id?: string) => {
    try {
      const notebookDeleted = await fetch(
        `http://localhost:3000/api/libretas?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (notebookDeleted) {
        await refresh();
      }

      return;
    } catch (error) {
      console.log(error);
    }
  };

const handleDeleteNoteInNotebook=async(event:React.MouseEvent,id:string)=>{
  event.preventDefault();
  const notebookData={...notebook}
  const noteInNotebookIndex= notebookData.notes.findIndex((note)=>note.id===id);

    if(noteInNotebookIndex !==-1){
      notebookData.notes.splice(noteInNotebookIndex,1);
      try {
        const deleteNoteInNotebook= await fetch("http://localhost:3000/api/libretas",{
          method:"PUT", body: JSON.stringify(notebookData)
        });
        if(deleteNoteInNotebook){
          await refresh();
        }

        return;
      } catch (error) {
        
      }
    }
}

  return (
    <div className="">
      <div
        className="flex py-3 mt-2 bg-primary hover:brightness-125 cursor-pointer"
        onClick={() => showNotes?setShowNotes(""):setShowNotes(notebook.id?notebook.id:"")}
      >
        <ArrowDropDownIcon
          className={`transition-all duration-100 ${
            !showNotes && "-rotate-90"
          }`}
        />
        <CollectionsBookmarkIcon />
        <p className="w-full select-none">{notebook.title}</p>
        <DeleteIcon
          fontSize="small"
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteNotebook(notebook?.id);
          }}
          className="mr-3 cursor-pointer hover:text-delete-hover"
        />
      </div>
      <ul
        className={`pl-4 mt-2 text-sm text-secondary-text ${
          !showNotes && "h-0 overflow-hidden"
        }`}
      >
        <GetNotesProvider>
        <AddNoteToNotebook notebook={notebook} />
        </GetNotesProvider>
        {notebook.notes.map((note) => (
          <li key={note.id} className="p-1  border-b hover:brightness-125 w-full overflow-hidden">
            <Link href={`/notas/${note.id}`} className="flex justify-between items-center">
             <div className="flex items-end gap-1">
             <DescriptionIcon />
              <p>{note.title.length>90?note.title.slice(0,90)+" ...":note.title}</p>
             </div>
              <CloseIcon className="mr-3 hover:text-delete-hover" onClick={(event)=>handleDeleteNoteInNotebook(event,note.id)}/>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotebookDropDown;
