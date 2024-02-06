import React from 'react'
import NotebookDropDown from './NotebookDropDown'
 import { NotebookDataI } from '@/app/db/dbMock'

 async function ListNotebooks() {
    const getNoebooks= await fetch("http://localhost:3000/api/libretas");

    const notebooksData=await getNoebooks?.json();


  return (
    <div className=' bg-base h-full w-full px-4'>
    {notebooksData.map((notebook:NotebookDataI)=>(
            <NotebookDropDown key={notebook.id} id={notebook.id} title={notebook.title} notes={notebook.notes}/>
    ))
        }
      
    </div>
  )
}

export default ListNotebooks
