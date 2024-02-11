"use client";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function TaskItemButtons({ isExpired, done }: { isExpired: boolean, done:boolean }) {
  const handleSuccess = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (<>
{
  !done ?
  <div className="flex gap-3">
  {isExpired ? (
    <div onClick={handleDelete}>
      <CloseIcon className="text-button-action hover:text-delete-hover absolute z-10 text-5xl top-1/3 right-4" />
    </div>
  ) : (
    <div onClick={handleSuccess}>
      <CheckCircleOutlineIcon className="text-button-action hover:text-success absolute z-10 text-5xl top-1/3 right-4" />
    </div>
  )}
</div>
:
<CheckCircleIcon className="absolute z-10 text-5xl text-success top-1/3 right-4"/>
}
</>
  );
}

export default TaskItemButtons;
