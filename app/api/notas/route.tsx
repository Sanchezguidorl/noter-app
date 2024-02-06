import { NextResponse } from "next/server";
import {db} from "../../../firebase/config";
import { getDocs, collection } from "firebase/firestore";

export const GET =async()=>{
try {
const notesRef= collection(db, "notes");

const getNotesData= await getDocs(notesRef);

const notesData= getNotesData.docs.map((doc)=>({id:doc.id, ...doc.data()}))

return NextResponse.json(notesData);

} catch (error) {
    console.log(error);
}
}