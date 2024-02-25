import ListNotebooks from '@/components/Pages/Libretas/ListNotebooks';
import React from 'react'

function page({params}:{params:{id:string}}) {
  return (
      <ListNotebooks paramsId={params.id}/>
  )
}

export default page
