import { NoteI, NotebookI } from "@/app/db/dbMock"
import { useGetNotebooksContext } from "@/contexts/GetNotebooksContext";
import { Dispatch, SetStateAction } from "react"

function NotesAddToNotebook({data, clases, input, setActive,setInput, notebookData}:{data:NoteI[], clases:string,input:string, notebookData:NotebookI,setActive:Dispatch<SetStateAction<boolean>>, setInput:Dispatch<SetStateAction<string>>} ) {
const {refresh}=useGetNotebooksContext();

const handleAddNoteToNotebook=async(note:NoteI)=>{
try {
    console.log("en metodo")
 const addNote=await fetch("http://localhost:3000/api/libretas",{
        method:"PUT",
        body: JSON.stringify({...notebookData, notes:[...notebookData.notes,{id:note.id, title:note.title}]})
    })
    if(addNote){
    await refresh();
    setActive(false);
    setInput("");
}
    return;
} catch (error) {
    console.log(error);
}
};


  return (
            <ul className={`absolute h-fit z-30 left-0 top-8 ml-2 text-black ${clases} overflow-hidden`}>
        {data
          .filter((note) => input && ((note.title?.toLowerCase().includes(input.toLowerCase())&& notebookData.notes.filter((item)=>note.id===item.id).length===0)&& input!==""))
          .map((filteredNote) => (
            <li onClick={()=>handleAddNoteToNotebook(filteredNote)} key={filteredNote.id} className="px-2 py-1 hover:brightness-150 uppercase text-xs border-b-2 text-ellipsis text-nowrap whitespace-nowrap">{filteredNote.title.length>90?filteredNote.title.slice(0,90)+" ...":filteredNote.title}</li>
          ))}
      </ul>      
  )
}

export default NotesAddToNotebook
