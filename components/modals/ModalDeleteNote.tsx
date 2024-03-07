import { NoteI } from "@/app/db/dbMock";
import Loading from "@/app/loading";
import { useAuthUserContext } from "@/contexts/AuthUserProvider";
import { Dispatch, SetStateAction, useState } from "react";
import ErrorMessage from "../layouts/ErrorMessage";

function ModalDeleteNote({
  closeModal,
  vacuumInput,
  idNote,
  refreshData,
}: {
  closeModal: () => void;
  refreshData: () => void;
  idNote: string;
  vacuumInput:(note:NoteI)=>void
}) {
  const [successDelete, setSuccessDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });
  const {user}= useAuthUserContext();
  const handleDelete = async () => {
    setLoading(true);
try {
  const noteDeleted = await fetch(`/api/notas?id=${idNote}&&userId=${user.uid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const isDeleted= await noteDeleted.json();
  if (isDeleted.success) {
    await refreshData();
    setLoading(false);
    setSuccessDelete(true);
    setTimeout(() => {
      vacuumInput({
        title: "",
        content: "",
        id: "",
        date: Date.now(),
        userId:""
      });
      closeModal();
    }, 2000);

    return;
  }else{
    setLoading(false);
    setTimeout(() => {
      
      closeModal();
    }, 2000);
    throw new Error(isDeleted.error.message);
  }
} catch (error) {
  setErrorMessage({
    show: true,
    message:
    (error as Error).message
  });
}
  };

  return (
    <>
      {loading && <Loading useIcon={true} text={"Eliminando..."}/>}
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
              <p>La nota ha sido eliminada correctamente</p>
            </div>
          ) : (
            <>
              <p>¿Deseas eliminar este elemento?</p>
              <div className="flex justify-center gap-2 mt-4">
                <p
                  className="py-2 w-20 text-center cursor-pointer border-2 border-c-transparent bg-interactive hover:border-primary-buttons"
                  onClick={handleDelete}
                >
                  Sí
                </p>
                <p
                  className="py-2 w-20 text-center cursor-pointer border-2 border-c-transparent bg-interactive hover:border-primary-buttons"
                  onClick={closeModal}
                >
                  No
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      {errorMessage.show && (
          <ErrorMessage
            message={errorMessage.message}
            closeMessage={setErrorMessage}
          />
        )}
    </>
  );
}

export default ModalDeleteNote;
