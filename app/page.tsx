"use client";
import HomeContent from "@/components/Pages/Home/HomeContent";
import { useAuthUserContext } from "@/contexts/AuthUserProvider";
import LoginUser from "./login/page";
import { useEffect, useState } from "react";
import Loading from "./loading";

function Home() {
  const { user } = useAuthUserContext();
  const [loadign,setLoading]=useState(true);


  useEffect(()=>{
setTimeout(()=>{
  setLoading(false);
},600)
  },[])



  return <>{loadign ? <Loading useIcon={true} text="Validando credenciales..."/> :user.logged ? <HomeContent /> : <LoginUser />}</>;
}

export default Home;
