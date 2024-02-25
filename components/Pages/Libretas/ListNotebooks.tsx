"use client";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { NotebookI } from "@/app/db/dbMock";
import { Suspense, lazy, useEffect, useState } from "react";
import AddNotebook from "./AddNotebook";
import Loading from "@/app/loading";
const NotebookDropDown = lazy(() => import("./NotebookDropDown"));
import { useGetNotebooksContext } from '@/contexts/GetNotebooksProvider';

function ListNotebooks({ paramsId }: { paramsId: string }) {
  const [showNotes, setShowNotes] = useState<string>(paramsId);
  const { notebooksData, refresh } = useGetNotebooksContext();
  const [addNotebook, setAddNotebook] = useState<boolean>(
    paramsId === "agregar"
  );
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
  console.log(notebooksData);
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
      <div className=" relative min-h-40 pb-4">
        <AddNotebook selected={addNotebook} unSelect={setAddNotebook} />
        <Suspense fallback={<Loading text="Cargando libretas..." />}>
          {notebooksData.map((notebook: NotebookI) => (
            <NotebookDropDown
              key={notebook.id}
              notebook={notebook}
              showNotes={showNotes === notebook.id}
              setShowNotes={setShowNotes}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
}

export default ListNotebooks;
