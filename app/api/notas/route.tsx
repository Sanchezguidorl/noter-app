import { NoteI } from "@/app/db/dbMock";
import { validateWhitespaceString } from "@/app/utils/utils";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../firebase/config";

const notesRef = collection(db, "notas");

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({
      success: false,
      error: { message: "Usuario no autorizado para realizar esta operación" },
    });
  }
  try {
    const q = await query(notesRef, where("userId", "==", userId));
    const getNotesData = await getDocs(q);

    let notesData = await getNotesData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, data: notesData });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: { message: (error as Error).message },
    });
  }
};

export const POST = async (req: NextRequest) => {
  const data = await req.text();
  try {
    const newData: NoteI = JSON.parse(data);
    const errorTitleMessage = "El título no debe estar vacío";
    validateWhitespaceString(newData.title, errorTitleMessage);
    const errorContentMessage = "El contenido no debe estar vacío";
    validateWhitespaceString(newData.content, errorContentMessage);
    const newNote = doc(notesRef);
    delete (newData as any).id;
    await setDoc(newNote, newData);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: { message: (error as Error).message },
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get("id");
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId || !id) {
    return NextResponse.json({
      success: false,
      error: {
        message: "Los parámetros para la búsqueda no fueron proporcionados",
      },
    });
  }
  const noteByIdRef = doc(notesRef, id.toString());
  try {
    const noteByIdFound = await getDoc(noteByIdRef);
    if (!noteByIdFound.exists) {
      throw new Error("La nota no fue encontrada. Verifica los datos enviados");
    }

    if (noteByIdFound.data()?.userId !== userId) {
      throw new Error("Usuario no autorizado para realizar esta operación");
    }

    const deletedNote = await deleteDoc(noteByIdRef);
    await deleteNoteFromNotebook(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: {message:(error as Error).message} });
  }
};

export const PUT = async (req: NextRequest) => {
  const dataRequest = await req.text();
  const dataUpdated = JSON.parse(dataRequest);
  const { id } = dataUpdated;
  const noteByIdRef = doc(notesRef, id);
  const userId = req.nextUrl.searchParams.get("userId");

  if (dataUpdated.userId !== userId || !userId) {
    return NextResponse.json({
      success: false,
      error: {
        message: "Usuario no autorizado para realizar esta operación",
      },
    });
  }
  try {
    const errorTitleMessage = "El título no debe estar vacío";
    validateWhitespaceString(dataUpdated.title, errorTitleMessage);
    const errorContentMessage = "El contenido no debe estar vacío";
    validateWhitespaceString(dataUpdated.content, errorContentMessage);
    const updatedNote = await updateDoc(noteByIdRef, dataUpdated);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: { message: (error as Error).message },
    });
  }
};

const deleteNoteFromNotebook = async (id: string) => {
  const notebooksRef = collection(db, "libretas");

  try {
    const notebooksSnapshot = await getDocs(notebooksRef);
    const notebooksData = notebooksSnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    if (notebooksData) {
      notebooksData.forEach(async (notebook) => {
        const noteIndex = notebook.notes.findIndex(
          (note: NoteI) => note.id === id
        );
        if (noteIndex !== -1) {
          notebook.notes.splice(noteIndex, 1);

          const notebookById = doc(notebooksRef, notebook.id);
          await updateDoc(notebookById, { ...notebook, notes: notebook.notes });
        }
      });
      return;
    }
  } catch (error) {
    throw new Error("No fue posible eliminar la nota de la libreta");
  }
};
