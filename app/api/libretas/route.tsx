import { NotebookDataI } from "@/app/db/dbMock";
import { validateWhitespaceString } from "@/app/utils/utils";
import { db } from "@/firebase/config";
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

const notebooksRef = collection(db, "libretas");

export const GET = async (req: NextRequest) => {
  try {
    const userId: String = String(req.nextUrl.searchParams.get("userId"));

    if (!userId) {
      return NextResponse.json({
        success: false,
        error: {
          message: "Usuario no autorizado para realizar esta operación",
        },
      });
    }

    const q = await query(notebooksRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const notebooksData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json({ success: true, data: notebooksData });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: { message: (error as Error).message },
    });
  }
};

export const POST = async (req: NextRequest) => {
  const data = await req.text();
  const newData: NotebookDataI = JSON.parse(data);
  try {
    const errorMessage = "El título no debe estar vacío";
    validateWhitespaceString(newData.title, errorMessage);
    const newNotebook = doc(notebooksRef);
    await setDoc(newNotebook, newData);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      error: {
        message: (error as Error).message,
      },
      success: false,
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  const id: String = String(req.nextUrl.searchParams.get("id"));
  const userId: String = String(req.nextUrl.searchParams.get("userId"));
  if (!id || !userId) {
    return NextResponse.json({
      success: false,
      error: {
        message:
          "Los parámetros para eliminar la libreta no fueron encontrados",
      },
    });
  }
  const notebookByIdRef = doc(notebooksRef, id.toString());

  try {
    const snapshot = await getDoc(notebookByIdRef);

    if (!snapshot.exists) {
      throw new Error("Libreta no encontrada");
    }

    if (snapshot.data()?.userId !== userId) {
      throw new Error("El usuario no autorizado para realizar esta acción");
    }
    const deletedNotebook = await deleteDoc(notebookByIdRef);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: { message: (error as Error).message },
    });
  }
};

export const PUT = async (req: NextRequest) => {
  const dataRequest = await req.text();
  const dataUpdated = JSON.parse(dataRequest);
  const { id } = dataUpdated;
  const uid = req.nextUrl.searchParams.get("userId");
  const notebookByIdRef = doc(notebooksRef, id);

  if (!dataUpdated.id || !dataUpdated.userId) {
    return NextResponse.json({
      success: false,
      error: {
        message:
          "Los parámetros para eliminar la libreta no fueron encontrados",
      },
    });
  }
  if (dataUpdated.userId !== uid) {
    return NextResponse.json({
      success: false,
      error: { message: "El usuario no autorizado para realizar esta acción" },
    });
  }
  try {
    const updatedNotebook = await updateDoc(notebookByIdRef, dataUpdated);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
};
