'use client';
import HomeIcon from "@mui/icons-material/Home";
import { usePathname } from 'next/navigation';

function HomeButton() {
    const router = usePathname()


  return (
    <div className={`border-b-2 p-1 hover:text-primary-buttons ${router === '/'&& 'text-primary-buttons brightness-125'}`}>
    <HomeIcon fontSize='small'/>
    </div>
  )
}

export default HomeButton
