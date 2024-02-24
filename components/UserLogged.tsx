"use client";
import { useAuthUserContext } from '@/contexts/AuthUserProvider';
import LogoutIcon from '@mui/icons-material/Logout';

function UserLogged() {
  const {user, logout}=useAuthUserContext();

  const handleLogout=async()=>{
    await logout();
  }

    return (
    <div className="bg-black text-xs items-center text-button-action font-semibold sticky top-0 left-0 w-full z-10 flex justify-between uppercase py-1 px-2">
      <p>{user.email}</p>
      <div className="flex gap-2 items-center cursor-pointer transition-all duration-300 hover:brightness-150" onClick={handleLogout}><p>Cerrar Sesión</p><LogoutIcon/></div>
    </div>
  )
}

export default UserLogged
