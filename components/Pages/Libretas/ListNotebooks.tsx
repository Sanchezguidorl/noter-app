"use client";
import { NotebookI } from "@/app/db/dbMock";
import Loading from "@/app/loading";
import { useGetNotebooksContext } from "@/contexts/GetNotebooksProvider";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import { Suspense, lazy, useState } from "react";
import AddNotebook from "./AddNotebook";
const NotebookDropDown = lazy(() => import("./NotebookDropDown"));

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

  return (
    <div className=" bg-base h-full w-full px-4 flex flex-col relative">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl mb-4 mt-3">Libretas</h1>
        <AddBoxIcon
          onClick={() => setAddNotebook(true)}
          className="mr-6 text-3xl hover:text-primary-buttons cursor-pointer"
        />
      </div>
      <div className="h-full  min-h-40 pb-4 relative">
        <AddNotebook selected={addNotebook} unSelect={setAddNotebook} />
        <Suspense
          fallback={<Loading useIcon={true} text="Cargando libretas..." />}
        >
          <>
            {notebooksData.length > 0 ? (
              <>
                {notebooksData.map((notebook: NotebookI) => (
                  <NotebookDropDown
                    key={notebook.id}
                    notebook={notebook}
                    showNotes={showNotes === notebook.id}
                    setShowNotes={setShowNotes}
                  />
                ))}
              </>
            ) : (
              <div className="text-secondary-text flex justify-center items-center h-full text-xl sm:text-3xl ">
                <p className="flex justify-center items-center gap-1">
                  <HistoryToggleOffIcon fontSize="large" />
                  No tienes tareas agregadas
                </p>
              </div>
            )}
          </>
        </Suspense>
      </div>
    </div>
  );
}

export default ListNotebooks;
