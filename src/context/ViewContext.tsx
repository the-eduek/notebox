import React, { createContext, useState } from "react";

interface ViewContextType {
  notesView: ViewType;
  updateView: (newView: ViewType) => void;
}

interface ViewProviderProps {
  children: React.ReactNode;
}
 
type ViewType = "grid" | "list";

const ViewContext = createContext<ViewContextType>({
  notesView: "list",
  updateView: () => {},
});

export const ViewProvider: React.FC<ViewProviderProps> = ({
  children,
}: ViewProviderProps) => {
  let localView: ViewType;
  const isLocal = localStorage.getItem("localView");

  isLocal && ["grid", "list"].includes(isLocal as ViewType)
    ? (localView = isLocal as ViewType)
    : (localView = "list");

  const [notesView, setNotesView] = useState<ViewType>(localView);

  const updateView = (newView: ViewType): void => {
    localStorage.setItem("localView", newView);
    setNotesView(() => newView);
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
