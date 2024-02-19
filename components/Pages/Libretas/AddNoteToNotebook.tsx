
import { NotebookI } from '@/app/db/dbMock';
import NotesAddToNotebook from '@/components/layouts/NotesAddToNotebook';
import { useGetNotesContext } from '@/contexts/GetNotesProvider';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useRef, useState } from 'react';

function AddNoteToNotebook({notebook}:{notebook:NotebookI}) {
  const [active,setActive]=useState<boolean>(false);
  const [noteSearched,setNoteSearched]=useState<string>("");
  const {notesData,refreshData}= useGetNotesContext();
  const refElement=useRef(null);
  
  const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setNoteSearched(event.target.value);
  }

  const getData=async()=>{
    try {
      await refreshData();
      return;
    } catch (error) {
      
    }
  };

  const handleClickOutSide=(event:MouseEvent)=>{
    if(refElement.current && !refElement.current.contains(event.target as Node)){
      setActive(false);
    }
}

  useEffect(()=>{
    if(active){
      getData()
      document.addEventListener("click",handleClickOutSide)
    }
    return ()=>document.removeEventListener("click",handleClickOutSide);
  },[active]);

  return (
    <li ref={refElement} className="p-1 font-bold  border-b cursor-pointer flex relative" onClick={()=>{ setActive(true);}}>
      <AddIcon />{
        active ?
        <div className='w-full'>
          <input autoFocus className='bg-base w-full' onChange={handleChange} value={noteSearched} type="text" placeholder='Escribe el nombre de la libreta que buscas' />
          <NotesAddToNotebook setInput={setNoteSearched} notebookData={notebook} data={notesData} setActive={setActive} input={noteSearched} clases={"bg-base w-[99%] text-secondary-text"}/>
        </div>
        :
        <p> Agregar una nota</p>
      }
    </li>
  )
}

export default AddNoteToNotebook