"use client";
import UserLogged from "@/components/UserLogged";
import { useAuthUserContext } from "@/contexts/AuthUserProvider";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";

function NoteLayout({
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
    return <Loading text="Cargando sección..." />;
  }
  return (
    <>
      {user.logged ? (
        <div className="w-full">
          <UserLogged />
          <div className="flex flex-col sm:flex-row w-full h-fit gap-2 sm:gap-0 justify-center items-center sm:items-start bg-base">
            {children}
          </div>
        </div>
      ) : (
        loginUser
      )}
    </>
  );
}

export default NoteLayout;
