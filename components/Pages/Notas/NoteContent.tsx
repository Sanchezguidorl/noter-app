"use client";
import { NoteI } from "@/app/db/dbMock";
import "../../../styles/NoteEditAndAdd.css";
import { useState } from "react";
import LoadingTransparent from "@/components/layouts/LoadingTransparent";
import DeleteIcon from '@mui/icons-material/Delete';
import ModalDeleteElement from "@/components/modals/ModalDeleteElement";
function NoteContent({ note, refresh, isNewNote }: { note: NoteI, refresh:()=>void, isNewNote:boolean }) {
  const [noteData, setNoteData] = useState<NoteI>({
    title: note.title,
    content: note.content,
    id: note.id,
    date: note.date,
  });
  const [loading, setLoading]=useState<boolean>(false);
const [showModalDelete, setShowModalDelete]=useState<boolean>(false);
  const handleChangeTitle = (
    input: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNoteData({ ...noteData, title: input.target.value });
  };

  const handleChangeContent = (
    input: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setNoteData({ ...noteData, content: input.target.value });
  };

  const saveData = async () => {
    setLoading(true);
    try {
      const savedNote=await  fetch(" http://localhost:3000/api/notas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, 
      body:JSON.stringify(noteData)
      });

        if(savedNote){
          refresh();
          setNoteData({...noteData,title:"", content:""});
          setLoading(false);
          return;
        }
    } catch (error) {
      console.log(error)
    }
  };

  const updateData = async () => {
    setLoading(true);
    try {
      const updatedNote=await  fetch(" http://localhost:3000/api/notas", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        }, 
      body:JSON.stringify(noteData)
      });

        if(updatedNote){
          refresh();
          setLoading(false);
          return;
        }
    } catch (error) {
      console.log(error)
    }
  };

  const closeModal=()=>{
    setShowModalDelete(false);
  }
  return (
    <>
    <div className=" w-full h-screen bg-primary">
      <div id="NoteContentPanel" className="text-white py-8 px-3">
        <label htmlFor="TitleInpuut">{""}</label>
        <input
          id="TitleInpuut"
          type="text"
          className="w-full h-10 bg-primary text-2xl"
          value={noteData.title}
          onChange={handleChangeTitle}
          placeholder="Escribe un título"
        />
        <p className="mt-6">
          <textarea
            className=" w-full  bg-primary"
            placeholder="Escribe el contenido de tu nota"
            value={noteData.content}
            onChange={handleChangeContent}
          ></textarea>
        </p>
{
  !isNewNote &&
  <button onClick={()=>setShowModalDelete(true)}
  className=" text-white py-3 float-left bg-delete-alert px-6 rounded-xl hover:brightness-125"
>
  {""}
 <DeleteIcon/>
</button>
}
        <button
          onClick={isNewNote?saveData: updateData}
          className=" bg-primary-buttons py-3 px-6 rounded-xl float-right hover:brightness-125"
        >
          Guardar
        </button>
      </div>
    </div>
      {loading && <LoadingTransparent text={"Guardando datos..."}/>}
      {showModalDelete && <ModalDeleteElement closeModal={closeModal} refreshData={refresh} idNote={note.id}/>}
      </>
  );
}

export default NoteContent;
