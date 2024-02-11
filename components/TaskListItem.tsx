import Link from "next/link";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import TaskItemButtons from "./Buttons/TaskItemButtons";
import { readDate } from './../app/utils/utils';
import { TasksI } from "@/app/db/dbMock";

function TaskListItem({id,toDo, limitDate, done}: TasksI) {

const isExpire=(date:number):boolean=>{
  const dateNow= new Date().getTime();
  return dateNow>date;
}

const bgByLimitDate=()=>{
let className='';
if(done){
  className='bg-success-alert';
}
else if(isExpire(limitDate)){
className='bg-delete-alert line-through';
}else{
  className='bg-warning-alert';
}

return className;
};

  return (
    <Link href={`/tareas/${id}`}>
      <div className={`p-4 ${bgByLimitDate()} rounded-lg flex-col mt-3 relative`}>
        <div className="overflow-hidden">
          <p className=" text-nowrap">
{
  toDo
}
          </p>
        </div>
        <div className="flex justify-between mt-3">
          <p className=" flex items-center gap-1 text-button-action">
            {readDate(limitDate)} <AccessAlarmIcon />
          </p>
<TaskItemButtons isExpired={isExpire(limitDate)} done={done}/>
        </div>
      </div>
    </Link>
  );
}

export default TaskListItem;
