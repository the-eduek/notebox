import React, { createContext, useState } from "react";
import { ViewType } from "../types";

interface ViewContextTYpe {
  notesView: ViewType;
  updateView: (newView: ViewType) => void;
}

interface ViewProviderProps {
  children: React.ReactNode;
}

const ViewContext = createContext<ViewContextTYpe>({
  notesView: "list",
  updateView: () => {},
});

export const ViewProvider: React.FC<ViewProviderProps> = ({
  children,
}: ViewProviderProps) => {
  let localView: ViewType;
  const isLocal: string | null = localStorage.getItem("localView");

  if (!isLocal || !["grid", "list"].includes(isLocal)) localView = "list";
  else localView = isLocal as ViewType;

  const [notesView, setNotesView] = useState<ViewType>(localView);

  const updateView = (newView: ViewType): void => {
    localStorage.setItem("localView", newView);
    setNotesView(newView);
  };

  return (
    <ViewContext.Provider
      value={{
        notesView,
        updateView,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};

export default ViewContext;
