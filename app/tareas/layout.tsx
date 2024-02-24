"use client"
import Loading from '@/app/loading';
import UserLogged from '@/components/UserLogged'
import { useAuthUserContext } from '@/contexts/AuthUserProvider';
import { useEffect, useState } from 'react';

function TasksLayout({children,loginUser}: {
  children: React.ReactNode, loginUser:React.ReactNode
}) {

const {user}=useAuthUserContext();
const [loading, setLoading] = useState(true);

useEffect(() => {
    const timer = setTimeout(() => {
    setLoading(false);
  }, 500);

  return () => clearTimeout(timer);
}, [user.logged]);

if (loading) {
  return <Loading text="Cargando sección..."/>
}
return ( 
  <>
  {user.logged ?
      <div className="w-full">
      <UserLogged/>
    <div className="p-4 bg-base">
    {children}
    </div>
    </div>
    :
    loginUser
  }
  </>
    )
}

export default TasksLayout;
