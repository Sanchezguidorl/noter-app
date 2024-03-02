import { Dispatch, SetStateAction, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
function ErrorMessage({
  message,
  closeMessage,
}: {
  message: string;
  closeMessage: Dispatch<SetStateAction<{ show: boolean; message: string }>>;
}) {
const messageRef= useRef<HTMLDivElement>(null);

const handleClickOut=(event:MouseEvent)=>{
  if(!messageRef.current?.contains(event.target as Node) ){
    closeMessage({ show: false, message: "" })
  }
};
useEffect(()=>{
document.addEventListener('click',handleClickOut);

return ()=>document.removeEventListener('click',handleClickOut);
},[])

  return (
    <div ref={messageRef} className="absolute top-10 flex justify-center z-10 w-full arise-animation select-none">
      <p className=" p-4 bg-delete-hover text-white rounded-3xl text-center w-2/4 text-xs flex justify-between items-center gap-1">
        {message}
        <CloseIcon
          fontSize="small"
          className="cursor-pointer text-button-action hover:text-white"
          onClick={() => closeMessage({ show: false, message: "" })}
        />
      </p>
    </div>
  );
}

export default ErrorMessage;
