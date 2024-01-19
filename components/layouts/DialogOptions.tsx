import '../../styles/layouts/SquareOptions.css';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DialogOptions from './DialogOptions';

function SquareOptions() {
  return (
    <div className="flex flex-col justify-center items-end">
      <MoreHorizIcon className='cursor-pointer'/>
<div className="relative z-10 ">
<div className="dialog absolute -top-2 right-1"></div>
      <div className="bg-primary rounded-sm p-2 ">
      <div className='text-center text-xs'>
        <p className=''>Hola</p>
        <p className=''>Hola</p>
      </div>
</div>
</div>
    </div>
  );
}

export default SquareOptions;
