import React, { createContext, useEffect, useState } from "react";

export type ViewType = "grid" | "list";

interface ViewContextType {
  notesView: ViewType;
  setNotesView: React.Dispatch<React.SetStateAction<ViewType>>;
}

interface ViewContextProviderProps {
  children: React.ReactNode;
}

export const ViewContext = createContext<ViewContextType | null>(null);

const ViewContextProvider: React.FC<ViewContextProviderProps> = ({
  children,
}: ViewContextProviderProps) => {
  const [notesView, setNotesView] = useState<ViewType>("list");

  useEffect(() => {
    const isLocal = localStorage.getItem("localView");

    if (["grid", "list"].includes(isLocal as ViewType)) {
      setNotesView(() => isLocal as ViewType);
    }
  }, []);

  return (
    <ViewContext.Provider value={{ notesView, setNotesView }}>
      {children}
    </ViewContext.Provider>
  );
};

export default ViewContextProvider;
