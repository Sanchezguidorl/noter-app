"use client";

import Loading from "@/app/loading";
import UserLogged from "@/components/UserLogged";
import { useAuthUserContext } from "@/contexts/AuthUserProvider";
import { useEffect, useState } from "react";

function NotebooksLayout({
  children,
  loginUser,
}: {
  children: React.ReactNode;
  loginUser: React.ReactNode;
}) {
  const { user } = useAuthUserContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [user.logged]);

  if (loading) {
    return <Loading useIcon={true} text="Cargando sección..." />;
  }
  return (
    <>
      {user.logged ? (
        <div className="w-full h-full">
          <UserLogged />
          <div className="sm:flex-row w-full gap-2 sm:gap-0 justify-center items-center sm:items-start h-[92%]">
            {children}
          </div>
        </div>
      ) : (
        loginUser
      )}
    </>
  );
}

export default NotebooksLayout;
