import { TasksI } from "@/app/db/dbMock";
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

const tasksRef = collection(db, "tareas");

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({
      success: false,
      error: { message: "Usuario no autorizado para realizar esta operación" },
    });
  }

  try {
    const q = await query(tasksRef, where("userId", "==", userId));
    const tasksDocs = await getDocs(q);

    const tasksData = tasksDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, data: tasksData });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: { message: (error as Error).message },
    });
  }
};

export const POST = async (req: NextRequest) => {
  const data = await req.text();
  const newData: TasksI = JSON.parse(data);
  try {
    const errorTitleMessage = "La terea no debe estar vacía";
    validateWhitespaceString(newData.toDo, errorTitleMessage);
    const newTask = doc(tasksRef);
    await setDoc(newTask, newData);

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
        message:
          "Los parámetros para buscar la tarea no han sido proporcionados",
      },
    });
  }

  const taskByIdRef = doc(tasksRef, id.toString());
  try {
    const taskByIdFound = await getDoc(taskByIdRef);

    if (!taskByIdFound.exists) {
      throw new Error("La tarea especificada no ha sido encontrada");
    }

    if (taskByIdFound.data()?.userId !== userId) {
      throw new Error("Usuario no autorizado para realizar esta operación");
    }

    const deletedTask = await deleteDoc(taskByIdRef);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: { message: (error as Error).message },
    });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const dataRequest = await req.text();
    const dataUpdated = JSON.parse(dataRequest);
    const userId = req.nextUrl.searchParams.get("userId");

    if (dataUpdated.userId !== userId) {
      return NextResponse.json({
        success: false,
        error: {
          message: "Usuario no autorizado para realizar esta operación",
        },
      });
    }
    const errorTitleMessage = "La terea no debe estar vacía";
    validateWhitespaceString(dataUpdated.toDo, errorTitleMessage);
    const { id } = dataUpdated;
    const taskByIdRef = doc(tasksRef, id);

    const updatedTask = await updateDoc(taskByIdRef, dataUpdated);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: { message: (error as Error).message },
    });
  }
};
