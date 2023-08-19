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
  const [ notesView, setNotesView ] = useState<ViewType>('list');

  const updateView = (newView: ViewType): void => {
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