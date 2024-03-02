import { NoteI } from "@/app/db/dbMock";
import "../styles/NoteCard.css";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteNotesPanelContext } from "@/contexts/DeleteNotesPanelContext";
import { readDate } from "@/app/utils/utils";
import ModalDeleteNote from "./modals/ModalDeleteNote";
import { useState } from "react";
import { useGetNotesContext } from "@/contexts/GetNotesProvider";

function NoteCard({ data }: { data: NoteI }) {
  const { refreshData } = useGetNotesContext();
  const { deleteCards } = useDeleteNotesPanelContext();
  const [showModalDeleteElement, setShowModalDeleteElement] =
    useState<boolean>(false);

  function disableScroll() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollLeft = document.documentElement.scrollLeft;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  function enableScroll() {
    window.onscroll = function () {};
  }

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    disableScroll();
    setShowModalDeleteElement(true);
  };

  const handleCloseModal = () => {
    enableScroll();

    setShowModalDeleteElement(false);
  };

  const refresh = async () => {
    await refreshData();
    return;
  };

  return (
    <Link href={`/notas/${data.id}`}>
      <div
        id="NoteCard"
        className=" bg-primary h-full max-h-full w-40 min-w-40 rounded-xl p-2 relative"
      >
        {showModalDeleteElement && (
          <ModalDeleteNote
            vacuumInput={(data)=>{}}
            idNote={data.id}
            refreshData={refresh}
            closeModal={handleCloseModal}
          />
        )}
        {deleteCards && (
          <DeleteIcon
            onClick={handleClick}
            className="absolute right-3 bottom-2 z-10 text-button-action hover:text-delete-hover"
            fontSize="small"
          />
        )}
        <p className="overflow-hidden text-ellipsis text-nowrap mb-2">
          {data.title}
        </p>
        <div className="content-card overflow-y-hidden h-36">
          <p className="text-sm break-words">
            {data.content.length > 90
              ? data.content.substring(0, 90)
              : data.content}
          </p>
        </div>
        <p className=" text-secondary-text absolute bottom-2">
          {readDate(data.date)}
        </p>
      </div>
    </Link>
  );
}

export default NoteCard;
