import Link from "next/link"

export interface NoteInterface{
   title:string, itemId:string,date:string, content:string
}
function NoteCardPrevisualization({date, itemId, content, title}:NoteInterface) {
  return (
    <Link href={itemId}>
    <div className=" border border-l-0 border-r-0 border-primary p-1 text-secondary-text h-44 break-words flex flex-col justify-between">
     <h2 className="text-white">{title}</h2>
     <p className="text-sm mt-1">{content.substring(0,90)}{content.length>110 && '...'}</p>
     <p className="text-xs py-2">{date}</p> 
    </div>
    </Link>
  )
}

export default NoteCardPrevisualization
