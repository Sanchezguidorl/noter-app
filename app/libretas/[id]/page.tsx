import ListNotebooks from '@/components/Pages/Libretas/ListNotebooks';
import GetNotebooksContext from '@/contexts/GetNotebooksContext';
import React from 'react'

function page({params}:{params:{id:string}}) {
  return (
    <GetNotebooksContext>
      <ListNotebooks paramsId={params.id}/>
      </GetNotebooksContext>
  )
}

export default page
