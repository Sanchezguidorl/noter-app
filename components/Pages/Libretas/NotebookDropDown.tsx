import { NotebookI } from "@/app/db/dbMock";
import ModalDeleteNotebook from "@/components/modals/ModalDeleteNotebook";
import { useGetNotebooksContext } from "@/contexts/GetNotebooksProvider";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from '@mui/icons-material/Close';
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import AddNoteToNotebook from "./AddNoteToNotebook";
import { useAuthUserContext } from "@/contexts/AuthUserProvider";
import ErrorMessage from "@/components/layouts/ErrorMessage";

function NotebookDropDown({ notebook, showNotes, setShowNotes }: { notebook: NotebookI, showNotes:boolean, setShowNotes:Dispatch<SetStateAction<string>> }) {
  const { refresh } = useGetNotebooksContext();
  const {user}=useAuthUserContext();
  const [showModalDelete,setShowModalDelete]=useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

const handleDeleteNoteInNotebook=async(event:React.MouseEvent,id:string)=>{
  event.preventDefault();
  const notebookData={...notebook}
  const noteInNotebookIndex= notebookData.notes.findIndex((note)=>note.id===id);

    if(noteInNotebookIndex !==-1){
      notebookData.notes.splice(noteInNotebookIndex,1);
      try {
        const deleteNoteInNotebook= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/libretas?userId=${user.uid}`,{
          method:"PUT", body: JSON.stringify(notebookData)
        });


const response= await deleteNoteInNotebook.json();

        if(response.success){
          await refresh();
        }else{
          setErrorMessage({
            show: true,
            message: response.error.message,
          });
        }

        return;
      } catch (error) {
            setErrorMessage({
        show: true,
        message: (error as Error).message,
      });
      }
    }
}

const closeModal = () => {
  setShowModalDelete(false);
};


const refreshData=async()=>{
  await refresh();
}

  return (
    <div className="">
            {
        showModalDelete && <ModalDeleteNotebook useIcon={false} idNotebook={notebook.id} refreshData={refreshData} closeModalDelete={closeModal}/>
      }
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
            setShowModalDelete(true);
          }}
          className="mr-3 cursor-pointer hover:text-delete-hover"
        />
      </div>
      <div className={`transition-all duration-300 ${showNotes?"max-h-80":"max-h-0 overflow-hidden"}`}>
      <AddNoteToNotebook notebook={notebook} />
      </div>
      
      <ul
        className={`pl-4 mt-2 text-sm overflow-auto text-secondary-text transition-all duration-300 ${
          !showNotes ? "max-h-0 ": "max-h-96"}
          `}
      >
          
          
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
      {errorMessage.show && (
          <ErrorMessage
            message={errorMessage.message}
            closeMessage={setErrorMessage}
          />
        )}
    </div>
  );
}

export default NotebookDropDown;
