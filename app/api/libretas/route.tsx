import { db } from '@/firebase/config';
import {collection, getDocs} from 'firebase/firestore';
import { NextResponse } from 'next/server';

export const GET=async()=>{
    try {
    const notebooksRef= collection(db,'libretas');
    
    const getDataNotebooks= await getDocs(notebooksRef);
    
    const notebooksData= getDataNotebooks.docs.map((doc)=>({id:doc.id, ...doc.data()}))
  
    return NextResponse.json(notebooksData);
} catch (error) {
    console.log(error)
}

};