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
import { NoteI } from "@/app/db/dbMock";

const notesRef = collection(db, "notes");

export const GET = async () => {
  try {
    const getNotesData = await getDocs(notesRef);

    const notesData = getNotesData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(notesData);
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (req: NextRequest) => {
  const data = await req.text();
  const newData: NoteI = JSON.parse(data);
  try {
    const newNote = doc(notesRef);
    await setDoc(newNote, newData);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
};

export const DELETE = async (req: NextRequest) => {
  const id: String = String(req.nextUrl.searchParams.get("id") || "");
  const noteByIdRef = doc(notesRef,id.toString());
  try {
    const deletedNote = await deleteDoc(noteByIdRef);
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
      const updatedNote = await updateDoc(noteByIdRef,dataUpdated);
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ success: false, error: error });
    }
  };
  
