"use client";
import NotebookDropDown from "./NotebookDropDown";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { NotebookI } from "@/app/db/dbMock";
import { useGetNotebooksContext } from "@/contexts/GetNotebooksContext";
import { useEffect, useState } from "react";
import AddNotebook from "./AddNotebook";

function ListNotebooks() {
  const { notebooksData, refresh } = useGetNotebooksContext();
  const [addNotebook, setAddNotebook] = useState<boolean>(false);
  const refreshData = async () => {
    try {
      const refreshData = await refresh();

      if (refreshData) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className=" bg-base h-full w-full px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl mb-4 mt-3">Libretas</h1>
        <AddBoxIcon
          onClick={() => setAddNotebook(true)}
          className="mr-6 text-3xl hover:text-primary-buttons cursor-pointer"
        />
      </div>
      <AddNotebook selected={addNotebook} unSelect={setAddNotebook} />
      {notebooksData.map((notebook: NotebookI) => (
        <NotebookDropDown
          key={notebook.id}
          notebook={notebook}
        />
      ))}
    </div>
  );
}

export default ListNotebooks;
