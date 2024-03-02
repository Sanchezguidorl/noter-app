import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../firebase/config";
import {
  getDocs,
  collection,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { NoteI, NotebookI } from "@/app/db/dbMock";
import { validateWhitespaceString } from "@/app/utils/utils";

const notesRef = collection(db, "notas");

export const GET = async () => {
  try {
    const getNotesData = await getDocs(notesRef);

    let notesData=await getNotesData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

    if(notesData){
    return NextResponse.json(notesData);}
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (req: NextRequest) => {
  const data = await req.text();
  try {

    const newData: NoteI = JSON.parse(data);
    const errorTitleMessage="El título no debe estar vacío"
    validateWhitespaceString(newData.title,errorTitleMessage)
    const errorContentMessage="El contenido no debe estar vacío"
    validateWhitespaceString(newData.content,errorContentMessage)
    const newNote = doc(notesRef);
    delete (newData as any).id;
    await setDoc(newNote, newData);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error:{message:(error as Error).message} });
  }
};

export const DELETE = async (req: NextRequest) => {
  const id: string = String(req.nextUrl.searchParams.get("id") || "");
  const noteByIdRef = doc(notesRef,id.toString());
  try {
    const deletedNote = await deleteDoc(noteByIdRef);
    await deleteNoteFromNotebook(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
};

export const PUT = async (req: NextRequest) => {
    const dataRequest= await req.text();
    const dataUpdated= JSON.parse(dataRequest);
    const {id}=dataUpdated;
    const noteByIdRef = doc(notesRef,id);
    try {
      const errorTitleMessage="El título no debe estar vacío"
      validateWhitespaceString(dataUpdated.title,errorTitleMessage)
      const errorContentMessage="El contenido no debe estar vacío"
      validateWhitespaceString(dataUpdated.content,errorContentMessage)
      const updatedNote = await updateDoc(noteByIdRef,dataUpdated);
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ success: false, error:{message:(error as Error).message} });
    }
  };
  
  const deleteNoteFromNotebook = async (id: string) => {
    const notebooksRef = collection(db, "libretas");
    try {
      const notebooksSnapshot = await getDocs(notebooksRef);
      const notebooksData =notebooksSnapshot.docs.map((doc)=>({...doc.data()}));
      if (notebooksData) {
        notebooksData.forEach(async(notebook) => {
          const noteIndex = notebook.notes.findIndex((note: NoteI)=> note.id === id);
          if (noteIndex !== -1) {

            notebook.notes.splice(noteIndex, 1);

            const notebookById = doc(notebooksRef, notebook.id);
            await updateDoc(notebookById, { ...notebook,notes: notebook.notes });
          }
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };