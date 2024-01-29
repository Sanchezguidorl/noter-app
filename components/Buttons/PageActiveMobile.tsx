'use client';
import { usePathname } from 'next/navigation';
import { ReactNode } from "react";

function PageActiveMobile({icon, currentUrl}:{icon:ReactNode, currentUrl:string}) {
    const router = usePathname()


  return (
    <div className={`border-b-2 p-1 hover:text-primary-buttons ${(router!=='/' && router.includes(`/${currentUrl}`) || (router==='/' && currentUrl==='/') )  && 'text-primary-buttons brightness-125'}`}>
    {icon}
    </div>
  )
}

export default PageActiveMobile
