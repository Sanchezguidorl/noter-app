"use client";
import { useEffect, useRef, useState } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import {
  NotebookDropDownMenuI,
  NotebookI,
} from "@/app/db/dbMock";
import { useGetNotebooksContext } from "@/contexts/GetNotebooksContext";

function DropDownItemNav({ itemCategoryName, icon }: NotebookDropDownMenuI) {
  const [active, setActive] = useState<boolean>(false);
  const { notebooksData, refresh } = useGetNotebooksContext();
  const refElement=useRef(null);

  const refreshData = async () => {
    try {
      await refresh();

      return;
    } catch (error) {}
  };

  const handleClickOutSide=(event:MouseEvent)=>{
    if(refElement.current && !refElement.current.contains(event.target as Node)){
      setActive(false);
    }
}

  useEffect(() => {
    if(active){
      document.addEventListener("click", handleClickOutSide);
      refreshData();
    }

    return ()=>document.removeEventListener("click", handleClickOutSide);
  }, [active]);

  return (
    <>
      <div
        ref={refElement}
        onClick={() => setActive(!active)}
        className="relative h-10 gap-1 flex items-center hover:bg-primary  pl-6 cursor-pointer uppercase"
      >
        {icon}
        {itemCategoryName}
          <ArrowDropDownIcon
            className={`absolute left-0 duration-500 cursor-pointer ${
              active ? "" : "-rotate-90"
            } transition-all duration-200`}
          />
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${active ? "max-h-96" : "max-h-0"}`}>
      <ul
        className={`pl-6 text-primary-buttons`}
        >
        <li className="px-2 py-1 hover:brightness-125 cursor-pointer uppercase text-xxs">
          <Link className="flex items-center" href={`/libretas/agregar`}>
            <AddIcon />
            <div>Nueva {itemCategoryName.replace("s", "")}</div>
          </Link>
        </li>
       {
         notebooksData.map((item: NotebookI) => (
           <Link
           href={`/${itemCategoryName.toLocaleLowerCase()}/${item.id}`}
           key={item.id}
           >
            <li className="px-2 py-1 text-xxs hover:brightness-125 cursor-pointer uppercase">
              <LibraryBooksIcon fontSize="small" />
              {item.title}
            </li>
          </Link>))
       }
      </ul>
       </div>
    </>
  );
}

export default DropDownItemNav;
