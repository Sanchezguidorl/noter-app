import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import SaveIcon from '@mui/icons-material/Save';
import { NotebookI } from "@/app/db/dbMock";
import { useGetNotebooksContext } from "@/contexts/GetNotebooksContext";
import CloseIcon from '@mui/icons-material/Close';

const emptyNotebook={
    title:"", notes:[]
};

function AddNotebook({selected, unSelect}:{selected:boolean, unSelect:Dispatch<SetStateAction<boolean>>}) {
const [notebookDataInput, setNotebookDataInput]=useState<NotebookI>(emptyNotebook);

const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
const value=event.target.value;
setNotebookDataInput({...notebookDataInput, title:value})
};
const {refresh}=useGetNotebooksContext();

const closeInput=()=>{
    setNotebookDataInput(emptyNotebook)
    unSelect(false);
}

const handleSave=async()=>{
try {
    const notebookSaved= await fetch("http://localhost:3000/api/libretas",{
        "method":"POST", body: JSON.stringify(notebookDataInput), cache:"no-cache"
    });
    if(notebookSaved){
        await refresh();
    } 

    closeInput();
    return;
} catch (error) {
    console.log(error)
}
};

  return (
    <div className={`bg-primary  px-1 flex gap-1 overflow-hidden transition-all duration-300 ${selected? "py-2" : "h-0 py-0" }`}>
      <CollectionsBookmarkIcon />
      <label htmlFor="addNotebook"></label>
      <input onChange={handleChange} id="addNotebook" className=" bg-primary w-full" placeholder="Escríbe el nombre de tu libreta" type="text" value={notebookDataInput.title} />
              <CloseIcon onClick={closeInput} className=" cursor-pointer text-button-action hover:text-delete-hover" />
      <SaveIcon onClick={handleSave} className="mr-2 cursor-pointer hover:text-success"/>
    </div>
  );
}

export default AddNotebook;
