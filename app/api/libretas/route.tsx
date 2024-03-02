import { NotebookDataI } from '@/app/db/dbMock';
import { validateWhitespaceString } from '@/app/utils/utils';
import { db } from '@/firebase/config';
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

const notebooksRef= collection(db,'libretas');

export const GET=async()=>{
    try {
    
    const getDataNotebooks= await getDocs(notebooksRef);
    
    const notebooksData= getDataNotebooks.docs.map((doc)=>({id:doc.id, ...doc.data()}))
    return NextResponse.json(notebooksData);
} catch (error) {
    console.log(error)
}

};

export const POST = async (req: NextRequest) => {
    const data = await req.text();
    const newData: NotebookDataI = JSON.parse(data);
    try {
      const errorMessage="El título no debe estar vacío"
      validateWhitespaceString(newData.title,errorMessage)
      const newNotebook = doc(notebooksRef);
      await setDoc(newNotebook, newData);
  
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({
        error: {
          message: (error as Error).message,
        },success: false
      });
    }
  };
  
  export const DELETE = async (req: NextRequest) => {
    const id: String = String(req.nextUrl.searchParams.get("id") || "");
    const notebookByIdRef = doc(notebooksRef,id.toString());
    try {
      const deletedNotebook = await deleteDoc(notebookByIdRef);
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ success: false, error: error });
    }
  };
  
  export const PUT = async (req: NextRequest) => {
      const dataRequest= await req.text();
      const dataUpdated= JSON.parse(dataRequest)
      const {id}=dataUpdated;
      const notebookByIdRef = doc(notebooksRef,id);
      try {
        const updatedNotebook = await updateDoc(notebookByIdRef,dataUpdated);
        return NextResponse.json({ success: true });
      } catch (error) {
        return NextResponse.json({ success: false, error: error });
      }
    };
    