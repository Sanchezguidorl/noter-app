import { NoteI, NotebookI } from "@/app/db/dbMock";
import { useAuthUserContext } from "@/contexts/AuthUserProvider";
import { useGetNotebooksContext } from "@/contexts/GetNotebooksProvider";
import { Dispatch, SetStateAction, useState } from "react";
import ErrorMessage from "./ErrorMessage";

function NotesAddToNotebook({
  data,
  clases,
  input,
  setActive,
  setInput,
  notebookData,
}: {
  data: NoteI[];
  clases: string;
  input: string;
  notebookData: NotebookI;
  setActive: Dispatch<SetStateAction<boolean>>;
  setInput: Dispatch<SetStateAction<string>>;
}) {
  const { refresh } = useGetNotebooksContext();
  const { user } = useAuthUserContext();
  const [errorMessage, setErrorMessage] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });
  const handleAddNoteToNotebook = async (note: NoteI) => {
    try {
      const addNote = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/libretas?userId=${user.uid}`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...notebookData,
            notes: [...notebookData.notes, { id: note.id, title: note.title }],
          }),
        }
      );

const response= await addNote.json();

      if (response.success) {
        await refresh();
        setActive(false);
        setInput("");
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
  };

  return (
    <ul
      className={`absolute h-fit z-30 left-0 top-8 ml-2 text-black ${clases} overflow-hidden`}
    >
      {data
        .filter(
          (note) =>
            input &&
            note.title?.toLowerCase().includes(input.toLowerCase()) &&
            notebookData.notes.filter((item) => note.id === item.id).length ===
              0 &&
            input !== ""
        )
        .map((filteredNote) => (
          <li
            onClick={() => handleAddNoteToNotebook(filteredNote)}
            key={filteredNote.id}
            className="px-2 py-1 hover:brightness-150 uppercase text-xs border-b-2 text-ellipsis text-nowrap whitespace-nowrap"
          >
            {filteredNote.title.length > 90
              ? filteredNote.title.slice(0, 90) + " ..."
              : filteredNote.title}
          </li>
        ))}
      <>
        {errorMessage.show && (
          <ErrorMessage
            message={errorMessage.message}
            closeMessage={setErrorMessage}
          />
        )}
      </>
    </ul>
  );
}

export default NotesAddToNotebook;
