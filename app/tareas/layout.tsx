"use client";
import Loading from "@/app/loading";
import UserLogged from "@/components/UserLogged";
import NavCompact from "@/components/layouts/NavCompact";
import NavComponent from "@/components/layouts/NavComponent";
import { useAuthUserContext } from "@/contexts/AuthUserProvider";
import GetNotebooksProvider from "@/contexts/GetNotebooksProvider";
import GetNotesProvider from "@/contexts/GetNotesProvider";
import { useEffect, useState } from "react";

function TasksLayout({
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
    return <Loading text="Cargando sección..." useIcon={true} />;
  }
  return (
    <>
      {user.logged ? (
        <GetNotebooksProvider>
          <GetNotesProvider>
            <div className="flex flex-col sm:flex-row h-full">
              <NavCompact />
              <NavComponent />
              <div className="w-full relative overflow-hidden h-full">
                <UserLogged />
                <div className="p-4 bg-base w-full h-full overflow-auto">
                  {children}
                </div>
              </div>
            </div>
          </GetNotesProvider>
        </GetNotebooksProvider>
      ) : (
        loginUser
      )}
    </>
  );
}

export default TasksLayout;
