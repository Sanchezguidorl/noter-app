"use client";
import { NoteI } from "@/app/db/dbMock";
import "../../../styles/NoteEditAndAdd.css";
import { useEffect, useState } from "react";
import LoadingTransparent from "@/components/layouts/LoadingTransparent";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalDeleteElement from "@/components/modals/ModalDeleteElement";
import { useGetNotesContext } from "@/contexts/GetNotesProvider";

function NoteContent({ id }: { id: string }) {
  const { notesData, refreshData } = useGetNotesContext();
  const [noteData, setNoteData] = useState<NoteI>({
    title: "",
    content: "",
    id: "",
    date: new Date().getDate(),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  useEffect(() => {
    if (notesData.length > 0) {
      const noteSelected = notesData.find((note) => {
        return note.id === id;
      });
      if (noteSelected) {
        setNoteData({
          title: noteSelected.title,
          content: noteSelected.content,
          id: noteSelected.id,
          date: noteSelected.date,
        });
      }
    }
  }, [id, notesData]);

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

  const refresh = async () => {
    await refreshData();
  };

  const saveData = async () => {
    setLoading(true);
    try {
      console.log(noteData);
      const savedNote = await fetch("http://localhost:3000/api/notas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });
      if (savedNote) {
        refresh();
        setNoteData({ ...noteData, title: "", content: "" });
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    setLoading(true);
    try {
      const updatedNote = await fetch("http://localhost:3000/api/notas", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });
      if (updatedNote) {
        refresh();
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setShowModalDelete(false);
  };

  return (
    <>
      <div className="w-full h-screen bg-primary ">
        <div id="NoteContentPanel" className="text-white py-8 px-3">
          <label htmlFor="TitleInput">{""}</label>
          <input
            id="TitleInput"
            type="text"
            className="w-full h-10 bg-primary text-2xl"
            value={noteData.title}
            onChange={handleChangeTitle}
            placeholder="Escribe un título"
          />
          <p className="mt-6">
            <textarea
              className="w-full bg-primary"
              placeholder="Escribe el contenido de tu nota"
              value={noteData.content}
              onChange={handleChangeContent}
            ></textarea>
          </p>
          {id !== "agregar" && (
            <button
              onClick={() => setShowModalDelete(true)}
              className="text-white py-3 float-left bg-delete-alert px-6 rounded-xl hover:brightness-125"
            >
              {""}
              <DeleteIcon />
            </button>
          )}
          <button
            onClick={id === "agregar" ? saveData : updateData}
            className="bg-primary-buttons py-3 px-6 rounded-xl float-right hover:brightness-125"
          >
            Guardar
          </button>
        </div>
      </div>
      {loading && <LoadingTransparent text={"Guardando datos..."} />}
      {showModalDelete && (
        <ModalDeleteElement
          closeModal={closeModal}
          refreshData={refresh}
          idNote={noteData.id}
        />
      )}
    </>
  );
}

export default NoteContent;
