import { NoteI } from "@/app/db/dbMock";
import "../styles/NoteCard.css";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteNotesPanelContext } from "@/contexts/DeleteNotesPanelContext";
import { readDate } from "@/app/utils/utils";
import ModalDeleteElement from "./modals/ModalDeleteElement";
import { useState } from "react";

function NoteCard({
  data,
  refreshData,
}: {
  data: NoteI;
  refreshData: () => void;
}) {
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

  const handleModal = () => {
    enableScroll();

    setShowModalDeleteElement(false);
  };

  return (
    <Link href={`/notas/${data.id}`}>
      <div
        id="NoteCard"
        className=" bg-primary h-full max-h-full w-40 min-w-40 rounded-xl p-2 relative"
      >
        {showModalDeleteElement && (
          <ModalDeleteElement
            idNote={data.id}
            refreshData={refreshData}
            closeModal={handleModal}
          />
        )}
        {deleteCards && (
          <DeleteIcon
            onClick={handleClick}
            className="absolute right-3 bottom-2 z-10 text-button-action hover:text-delete-hover"
            fontSize="small"
          />
        )}
        <p>
          {data.title.length > 22
            ? data.title.substring(0, 22) + "..."
            : data.title}
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
