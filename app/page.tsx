"use client";
import HomeContent from "@/components/Pages/Home/HomeContent";
import { useAuthUserContext } from "@/contexts/AuthUserProvider";
import LoginUser from "./login/page";
import Loading from "./loading";
import { useEffect, useState } from "react";

export default function Home() {
const {user}= useAuthUserContext();
const [loading, setLoading] = useState(true);

useEffect(() => {
    const timer = setTimeout(() => {
    setLoading(false);
  }, 500);

  return () => clearTimeout(timer);
}, [user.logged]);

if (loading) {
  return <Loading text="Cargando sección..." useIcon={true}/>
}

  return (<>{
    user.logged ?
    <HomeContent />
    :
    <LoginUser/>
  }
  </>
  )

}
