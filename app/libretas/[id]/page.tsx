import ListNotebooks from '@/components/Pages/Libretas/ListNotebooks';

function page({params}:{params:{id:string}}) {
  return (
      <ListNotebooks paramsId={params.id}/>
  )
}

export default page
