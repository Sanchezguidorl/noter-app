"use client";
import HomeContent from "@/components/Pages/Home/HomeContent";
import { useAuthUserContext } from "@/contexts/AuthUserProvider";
import LoginUser from "./login/page";

function Home() {
  const { user } = useAuthUserContext();

  return <>{user.logged ? <HomeContent /> : <LoginUser />}</>;
}

export default Home;
