import Loading from "@/app/loading";
import { useState } from "react";

function ModalDeleteNotebook({
  closeModalDelete,
  idNotebook,
  refreshData,
  useIcon
}: {
  closeModalDelete: () => void;
  refreshData: () => void;
  idNotebook: string;
  useIcon:boolean
}) {
  const [successDelete, setSuccessDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    const notebookDeleted = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/libretas?id=${idNotebook}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const isDeleted: { success: boolean } = await notebookDeleted.json();
    await refreshData();
    if (isDeleted) {
      setLoading(false);
      setSuccessDelete(true);
      setTimeout(() => {
        closeModalDelete();
      }, 2000);
    }
  };

  return (
    <>
      {loading && <Loading useIcon={useIcon} text={"Eliminando..."} />}
      <div
        onClick={(event: React.MouseEvent) => event.preventDefault()}
        className="fixed bg-overlay-transparent z-40 w-full h-full top-0 left-0 flex justify-center items-center cursor-default"
      >
        <div
          className={` bg-primary px-4 py-10 rounded-lg border-2 border-delete-hover ${
            successDelete ? " border-success" : " border-delete-hover"
          }`}
        >
          {successDelete ? (
            <div className="text-success">
              <p>La libreta ha sido eliminada correctamente</p>
            </div>
          ) : (
            <>
              <p>¿Deseas eliminar esta libreta?</p>
              <div className="flex justify-center gap-2 mt-4">
                <p
                  className="py-2 w-20 text-center cursor-pointer border-2 border-c-transparent bg-interactive hover:border-primary-buttons"
                  onClick={handleDelete}
                >
                  Sí
                </p>
                <p
                  className="py-2 w-20 text-center cursor-pointer border-2 border-c-transparent bg-interactive hover:border-primary-buttons"
                  onClick={closeModalDelete}
                >
                  No
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ModalDeleteNotebook;
