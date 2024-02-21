"use client";

import { useAuthUserContext } from "@/contexts/AuthUserProvider";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import HomeContent from "@/components/Pages/Home/HomeContent";

export default function Home() {
  const {user}=useAuthUserContext();

  useEffect(()=>{
if(!user.logged){
  redirect("/login");
}
  },[user.logged]);
  return (
<>
{user.logged &&<HomeContent/>}
</>
  );
}
