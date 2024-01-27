import React from 'react'
import NotebookDropDown from './NotebookDropDown'
import { dbMockNotebooks } from '@/app/db/dbMock'

function ListNotebooks() {
    const notebooksData= dbMockNotebooks.listItems;
  return (
    <div className=' bg-base h-full w-full px-4'>
    {notebooksData.map((notebook)=>(
            <NotebookDropDown key={notebook.id} id={notebook.id} title={notebook.title} notes={notebook.notes}/>
    ))
        }
      
    </div>
  )
}

export default ListNotebooks
