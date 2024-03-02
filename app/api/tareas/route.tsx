import { TasksI } from "@/app/db/dbMock";
import { validateWhitespaceString } from "@/app/utils/utils";
import { db } from "@/firebase/config"
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { NextRequest, NextResponse } from "next/server";

const tasksRef= collection(db,"tareas");

export const GET=async()=>{
try {

    const tasksDocs=await getDocs(tasksRef);

    const tasksData= tasksDocs.docs.map((doc)=>({id: doc.id , ...doc.data()}));

    return NextResponse.json(tasksData);
} catch (error) {
    return NextResponse.json({ success: false, error: error });
}
}

export const POST = async (req: NextRequest) => {
    const data = await req.text();
    const newData: TasksI = JSON.parse(data);
    try {
      const errorTitleMessage="La terea no debe estar vacía"
      validateWhitespaceString(newData.toDo,errorTitleMessage)
      const newTask = doc(tasksRef);
      await setDoc(newTask, newData);
  
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ success: false, error: {message:error.message} });
    }
  };
  
  export const DELETE = async (req: NextRequest) => {
    const id: String = String(req.nextUrl.searchParams.get("id") || "");
    const taskByIdRef = doc(tasksRef,id.toString());
    try {
      const deletedTask = await deleteDoc(taskByIdRef);
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ success: false, error: error });
    }
  };
  
  export const PUT = async (req: NextRequest) => {
    try {
      const dataRequest = await req.text();
      const dataUpdated = JSON.parse(dataRequest);
  
      const errorTitleMessage="La terea no debe estar vacía"
      validateWhitespaceString(dataUpdated.toDo,errorTitleMessage)
      const { id } = dataUpdated;
      const taskByIdRef = doc(tasksRef, id);
  
      const updatedTask = await updateDoc(taskByIdRef, dataUpdated);
  
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ success: false, error: {message:error.message} });
    }
  };