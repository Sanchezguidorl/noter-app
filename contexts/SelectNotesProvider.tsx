"use client"
import React, { createContext, useContext, useState } from 'react';

const CreateSelectNotesContext = createContext<{
  idSelected: string;
  selectId: (id: string) => void;
}>({
  idSelected: '',
  selectId: () => {},
});

export const useSelectNotesContext = () => useContext(CreateSelectNotesContext);

function SelectNotesProvider({ children }: { children: React.ReactNode }) {
  const [idSelected, setIdSelected] = useState<string>("");

  return (
    <CreateSelectNotesContext.Provider value={{ idSelected:idSelected, selectId: setIdSelected }}>
      {children}
    </CreateSelectNotesContext.Provider>
  );
}

export default SelectNotesProvider;