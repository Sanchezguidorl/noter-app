import { readDate } from "@/app/utils/utils";
function NoteCardPrevisualization({ date, id, content, title, selected, selectId }:{ selectId:(id:string)=>void,date:number, id:string, content:string, title:string, selected:boolean}) {
  return (
      <div onClick={()=>selectId(id)} className={`border  ${selected ? "border-button-action":  "border-primary border-l-0 border-r-0 hover:border-secondary-text"} m-1 p-1 text-secondary-text h-44 break-words flex flex-col justify-between cursor-pointer`}>
        <div>
          <h2 className="text-white">{title.substring(0, 30)}</h2>
          <p className="text-sm mt-1">
            {content.substring(0, 90)}
            {content.length > 110 && "..."}
          </p>
        </div>
        <p className="text-xs py-2">{readDate(date)}</p>
      </div>
  );
}

export default NoteCardPrevisualization;
