"use client";
import { NoteI } from "@/app/db/dbMock";
import "../../../styles/NoteEditAndAdd.css";
import { useEffect, useState } from "react";
import LoadingTransparent from "@/components/layouts/LoadingTransparent";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalDeleteNote from "@/components/modals/ModalDeleteNote";
import { useGetNotesContext } from "@/contexts/GetNotesProvider";

function NoteContent({ id }: { id: string }) {
  const { notesData, refreshData } = useGetNotesContext();
  const [noteData, setNoteData] = useState<NoteI>({
    title: "",
    content: "",
    id: "",
    date: Date.now(),
  });
  const [errorInputs, setErrorInputs] = useState({
    title: { valid: false, message: "El título no puede estar vacío" },
    content: { valid: false, message: "" },
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
    console.log(errorInputs.title.message);
    if (noteData.title.length ===0) {
      setErrorInputs({
        ...errorInputs,
        title: {
          valid: false,
          message: "El título no puede estar vacío",
        },
      });
    }
    else if (noteData.title.length < 4) {
      setErrorInputs({
        ...errorInputs,
        title: {
          valid: false,
          message: "El título no puede tener menos de 4 caracteres",
        },
      });
    } else if (noteData.title.length <= 80 && noteData.title.length > 3) {
      setErrorInputs({ ...errorInputs, title: { valid: true, message: "" } });
    } else {
      setErrorInputs({
        ...errorInputs,
        title: {
          valid: false,
          message: "El título no puede tener más de 80 caracteres",
        },
      });
    }
  }, [noteData.title]);

  useEffect(() => {
    if (noteData.content.length === 0) {
      setErrorInputs({
        ...errorInputs,
        content: { valid: false, message: "El contenido no puede estar vacío" },
      });
    } else if (noteData.content.length <= 2000 && noteData.content.length > 0) {
      setErrorInputs({ ...errorInputs, content: { valid: true, message: "" } });
    } else {
      setErrorInputs({
        ...errorInputs,
        content: {
          valid: false,
          message: "El contenido no puede tener más de 2000 caracteres",
        },
      });
    }
  }, [noteData.content]);

  const validateInputs = () => {
    const contentLength = noteData.content.length;
    const titleLength = noteData.title.length;
    const inputsValid =
      contentLength > 0 &&
      contentLength <= 2000 &&
      titleLength > 4 &&
      titleLength <= 80;

    return inputsValid;
  };

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
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    try {
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
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    try {
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
            <p className="absolute top-full left-0 text-delete-hover text-xs">
              {!errorInputs.title.valid && errorInputs.title.message}
            </p>
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
            <p className="absolute top-full left-0 text-delete-hover text-xs">
              {!errorInputs.content.valid && errorInputs.content.message}
            </p>
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
          <button
            disabled={!validateInputs()}
            onClick={noteData.id === "" ? saveData : updateData}
            className={`transition-all duration-200 py-3 px-6 rounded-xl float-right hover:brightness-125 ${validateInputs()?"bg-primary-buttons":" bg-secondary-text"}`}
          >
            Guardar
          </button>
        </div>
      </div>
      {loading && <LoadingTransparent text={"Guardando datos..."} />}
      {showModalDelete && (
        <ModalDeleteNote
          vacuumInput={setNoteData}
          closeModal={closeModal}
          refreshData={refresh}
          idNote={noteData.id}
        />
      )}
    </>
  );
}

export default NoteContent;
