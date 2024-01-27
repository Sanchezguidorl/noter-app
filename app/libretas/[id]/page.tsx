import ListNotebooks from '@/components/Pages/Libretas/ListNotebooks';
import React from 'react'
interface Params {
    id: string;
  }
  
  interface PageProps {
    params: Params;
  }

function page({params}:PageProps) {
  return (
    <>
      <ListNotebooks/>
    </>
  )
}

export default page
