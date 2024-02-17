import ListNotebooks from '@/components/Pages/Libretas/ListNotebooks';
import GetNotebooksContext from '@/contexts/GetNotebooksContext';
import React from 'react'
interface Params {
    id: string;
  }
  
  interface PageProps {
    params: Params;
  }

async function page({params}:PageProps) {
  const getNoebooks= await fetch("http://localhost:3000/api/libretas");

  const notebooksData=await getNoebooks?.json();


  return (
    <GetNotebooksContext>
      <ListNotebooks defaultData={notebooksData}/>
      </GetNotebooksContext>
  )
}

export default page
