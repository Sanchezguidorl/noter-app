import React, { Suspense, lazy } from "react";
import "../styles/NotesPanel.css";
import ButtonSection from "./layouts/ButtonSection";
import DialogOptions from "./layouts/DialogOptions";
import AddNoteCard from "./layouts/AddNoteCard";
import { DeleteNotesPanelProvider } from "@/contexts/DeleteNotesPanelContext";

async function NotesPanel() {
  const ListCards = lazy(() => import("./ListNoteCards"));

  return (
    <DeleteNotesPanelProvider>
      <div
        id="NotesPanel"
        className=" bg-base w-full sm:w-2/3 h-80 p-4 pb-2 rounded-xl flex flex-col relative"
      >
        <div className="relative">
          <p>NOTAS</p>
          <div className="absolute right-2 top-0">
            <DialogOptions />
          </div>
        </div>
        <ul className="mt-4 flex w-full gap-6">
          <li>
            <ButtonSection isActive={true} text={"Recientes"} />
          </li>
        </ul>
        <div className=" h-full mt-2 flex gap-2 max-w-full overflow-y-hidden overflow-x-auto pb-1 container-cards pr-6">
          <Suspense
            fallback={
              <div className="text-white w-96 h-96 bg-delete-hover text-5xl relative z-50">
                cargando
              </div>
            }
          >
            <ListCards />
          </Suspense>
          <AddNoteCard />
        </div>
        <div className="absolute right-4  h-60 bottom-2 w-10 overflow-gradient"></div>
      </div>
    </DeleteNotesPanelProvider>
  );
}

export default NotesPanel;
