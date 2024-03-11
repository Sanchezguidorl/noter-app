"use client";
import Loading from "@/app/loading";
import NavCompact from "@/components/layouts/NavCompact";
import NavComponent from "@/components/layouts/NavComponent";
import { useAuthUserContext } from "@/contexts/AuthUserProvider";
import { useEffect, useState } from "react";

function HomeLayout({
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
        <div className="flex flex-col sm:flex-row h-full">
          <NavCompact />
          <NavComponent />
              {children}
        </div>
      ) : (
        loginUser
      )}
    </>
  );
}

export default HomeLayout;