"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";



interface DeleteNotesPanelContextType{
    deleteCards:boolean|null, setDeleteCards: Dispatch<SetStateAction<boolean>>| null
}
const DeleteNotesPanelContext= createContext<DeleteNotesPanelContextType>({
    deleteCards:null, setDeleteCards: null
});


export const useDeleteNotesPanelContext=()=> useContext(DeleteNotesPanelContext);

export const DeleteNotesPanelProvider =({children}:{children:ReactNode})=>{
    const [deleteCards,setDeleteCards]=useState<boolean>(false);

    return (
        <DeleteNotesPanelContext.Provider value={{deleteCards:deleteCards, setDeleteCards:setDeleteCards}}>
            {children}
        </DeleteNotesPanelContext.Provider>
    )
}