"use client";
import Image from 'next/image'
import Link from 'next/link'
import StartImg from "/public/start-bg.webp"
import { useState } from 'react';

function StartLinkButton() {
    const [buttonActive, setButtonActive] =useState<boolean>(false);

  return (
<div className={`p-6 h-fit arise-animation overflow-hidden`}>
  <div className={`relative  transition-all duration-200 ${buttonActive?"-rotate-6 shadow-drop-hover":"rotate-0 "} shadow-drop`}>
  <Link onMouseOver={()=>setButtonActive(true)} onMouseOut={()=>setButtonActive(false)} href={"/"} className="link-start text-secondary-text transition-all duration-200 hover:text-white absolute text-1xl top-[40%]  sm:top-[35%] sm:text-5xl md:text-6xl lg:text-7xl left-1/2">
  {""}
    Empezar
  </Link>
<Image src={StartImg} className=" mx-auto" alt="Botón de empezar"/>
</div>
    </div>
  )
}

export default StartLinkButton
