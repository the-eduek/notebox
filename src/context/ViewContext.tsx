import React, { createContext, useState } from 'react';
import { ViewType } from '../types';

const ViewContext = createContext<{
  notesView: ViewType,
  updateView: (newView: ViewType) => void
}>({
  notesView: 'list',
  updateView: () => {}
});

interface ViewProviderProps {
  children: React.ReactNode
}

export const ViewProvider: React.FC<ViewProviderProps> = ({ children }: ViewProviderProps) => {
  let localView: ViewType;
  const isLocal: string | null = localStorage.getItem("localView");

  if (!isLocal) localView = "list";
  else localView = isLocal as ViewType;

  const [ notesView, setNotesView ] = useState<ViewType>(localView);

  const updateView = (newView: ViewType): void => {
    localStorage.setItem("localView", newView);
    setNotesView(newView);
  };

  return (
    <ViewContext.Provider 
      value={{
        notesView,
        updateView
      }}
    >
      { children }
    </ViewContext.Provider>
  );
};

export default ViewContext;