"use client";
import { NoteI } from "@/app/db/dbMock";
import "../../../styles/NoteEditAndAdd.css";
import { useEffect, useState } from "react";
import LoadingTransparent from "@/components/layouts/LoadingTransparent";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalDeleteNote from "@/components/modals/ModalDeleteNote";
import { useGetNotesContext } from "@/contexts/GetNotesProvider";
import ErrorMessage from "@/components/layouts/ErrorMessage";

function NoteContent({ id }: { id: string }) {
  const { notesData, refreshData } = useGetNotesContext();
  const [noteData, setNoteData] = useState<NoteI>({
    title: "",
    content: "",
    id: "",
    date: Date.now(),
  });
  const [errorInputs, setErrorInputs] = useState({
    title: { valid: false },
    content: { valid: false },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

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
        setErrorInputs({
          title: { valid: true },
          content: { valid: true },
        })
      } else {
        setNoteData({
          title: "",
          content: "",
          id: "",
          date: Date.now(),
        });
      }
    }

  }, [id, notesData]);

  useEffect(() => {
    if (
      noteData.title.length === 0 ||
      noteData.title.length < 4 ||
      noteData.title.length > 80
    ) {
      setErrorInputs({
        ...errorInputs,
        title: {
          valid: false,
        },
      });
    } else {
      setErrorInputs({ ...errorInputs, title: { valid: true } });
    }
  }, [noteData.title]);

  useEffect(() => {
    if (noteData.content.length === 0 || noteData.content.length > 2000) {
      setErrorInputs({
        ...errorInputs,
        content: { valid: false },
      });
    } else {
      setErrorInputs({ ...errorInputs, content: { valid: true } });
    }
  }, [noteData.content]);

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
       try {
    if (
      !(
        noteData.title.length > 3 &&
        noteData.title.length < 81 &&
        noteData.content.length > 0 &&
        noteData.content.length < 2001
      )
    ) {
      throw new Error("Los campos deben ser completados de manera correcta");
    }


    setLoading(true);

      const savedNote = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noteData),
        }
      );

        const response= await savedNote.json();

      if (response.success) {
        refresh();
        setNoteData({ ...noteData, title: "", content: "" });
        setLoading(false);
        return;
      }else{
        setLoading(false);
        throw new Error(response.error.message);
      }
    } catch (error) {
      setErrorMessage({
        show: true,
        message:
          error.message
      });
    }
  };

  const updateData = async () => {
    try {
    if (
      !(
        noteData.title.length > 3 &&
        noteData.title.length < 81 &&
        noteData.content.length > 0 &&
        noteData.content.length < 2001
      )
    ) {
      throw new Error("Los campos deben ser completados de manera correcta");
    }

    setLoading(true);

      const updatedNote = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notas`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noteData),
        }
      );

const response=await updatedNote.json();

      if (response.success) {
        refresh();
        setLoading(false);
        return;
      }else{
        setLoading(false);
        throw new Error(response.error.message);
      }
    } catch (error) {
      setErrorMessage({
        show: true,
        message:
          error?.message,
      });
    }
  };

  const closeModal = () => {
    setShowModalDelete(false);
  };

  return (
    <>
      <div className="w-full h-screen bg-primary relative ">
        <div id="NoteContentPanel" className="text-white py-8 px-3">
          <div className="relative">
            <label htmlFor="TitleInput">{""}</label>
            <input
              id="TitleInput"
              type="text"
              className="w-full h-1/2 bg-primary text-2xl"
              value={noteData.title}
              onChange={handleChangeTitle}
              placeholder="Escribe un título"
            />
            {!errorInputs.title.valid && noteData.title.length === 0 ? (
              <p className="absolute top-full left-0 text-delete-hover text-xs">
                El título no debe estar vacío
              </p>
            ) : noteData.title.length < 4 && noteData.title.length > 0 ? (
              <p className="absolute top-full left-0 text-delete-hover text-xs">
                El título no debe tener menos de 4 caracteres
              </p>
            ) : (
              noteData.title.length > 80 && (
                <p className="absolute top-full left-0 text-delete-hover text-xs">
                  El título no debe tener más de 80 caracteres
                </p>
              )
            )}
          </div>
          <div className="relative mb-6">
            <p className="mt-6">
              <textarea
                className="w-full bg-primary"
                placeholder="Escribe el contenido de tu nota"
                value={noteData.content}
                onChange={handleChangeContent}
              ></textarea>
            </p>
            {!errorInputs.content.valid && noteData.content.length === 0 ? (
              <p className="absolute top-full left-0 text-delete-hover text-xs">
                El contenido no debe estar vacío
              </p>
            ) : (
              noteData.content.length > 2000 && (
                <p className="absolute top-full left-0 text-delete-hover text-xs">
                  El contenido no debe tener más de 2000 caracteres
                </p>
              )
            )}
          </div>
          {noteData.id !== "" && (
            <button
              onClick={() => setShowModalDelete(true)}
              className="text-white py-3 float-left bg-delete-alert px-6 rounded-xl hover:brightness-125"
            >
              {""}
              <DeleteIcon />
            </button>
          )}
          {noteData.id === "" ? (
            <button
              disabled={!(errorInputs.content.valid && errorInputs.title.valid)}
              onClick={saveData}
              className={`transition-all duration-200 py-3 px-6 rounded-xl float-right hover:brightness-125 ${
                errorInputs.content.valid && errorInputs.title.valid
                  ? "bg-primary-buttons"
                  : " bg-secondary-text"
              }`}
            >
              Guardar
            </button>
          ) : (
            <button
              disabled={(errorInputs.content.valid===false || errorInputs.title.valid===false)}
              onClick={updateData}
              className={`transition-all duration-200 py-3 px-6 rounded-xl float-right hover:brightness-125 ${
                (errorInputs.content.valid===false || errorInputs.title.valid===false)
                  ?" bg-secondary-text"
                  :  "bg-primary-buttons"
              }`}
            >
              Actualizar
            </button>
          )}
        </div>
        {errorMessage.show && (
          <ErrorMessage
            message={errorMessage.message}
            closeMessage={setErrorMessage}
          />
        )}
      </div>
      {loading && <LoadingTransparent text={"Guardando datos..."} />}
      {showModalDelete && (
        <ModalDeleteNote
          vacuumInput={() => setNoteData}
          closeModal={closeModal}
          refreshData={()=>{refresh();setNoteData({
            title: "",
            content: "",
            id: "",
            date: Date.now(),
          });}}
          idNote={noteData.id}
        />
      )}
    </>
  );
}

export default NoteContent;
