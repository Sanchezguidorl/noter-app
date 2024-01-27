"use client";
import { ReactNode, useEffect, useRef, useState } from "react";

import Link from "next/link";

interface DropDownItemNavCompactI {
  linkAdd: string;
  icon: ReactNode;
  itemCategoryName: string;
  listItems: { itemName: string; itemId: string }[];
}

function DropDownItemNavCompact({
  icon,
  itemCategoryName,
  listItems,
  linkAdd,
}: DropDownItemNavCompactI) {
  const [active, setActive] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{

const handleClickOutside= (event:MouseEvent)=>{
  if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
    setActive(false)
  }
}

document.addEventListener('click',handleClickOutside);

return ()=> document.removeEventListener('click', handleClickOutside);

  },[])


  return (
    <div className="relative uppercase" ref={dropdownRef}  onClick={() => setActive(!active)}>
      <div
        className={` cursor-pointer border-b-2 p-1 border-white hover:border-primary-buttons hover:text-primary-buttons ${
          active && "border-none "
        }`}
      >
        {icon}
      </div>
      <ul
        className={` text-secondary-text overflow-hidden absolute top-full w-36 -right-3/4 z-30 bg-base rounded-br-md rounded-bl-md text-xs text-center border mt-2 border-secondary-text border-t-0 transition-all duration-300  ${
          active ? "max-h-500 px-1 py-2" : "h-0 p-0 border-none"
        }`}
      >
        <li className=" hover:text-white">
          <Link href={`/add-panel/${linkAdd}`}>
            Agregar nuevas {itemCategoryName}
          </Link>
        </li>
        {listItems.length > 0 &&
          listItems.map((item) => (
            <li key={item.itemId} className=" hover:text-white uppercase">
              <Link href={`/${linkAdd}/${item.itemId}`}>
                {item.itemName}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DropDownItemNavCompact;
