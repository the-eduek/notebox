import { createContext, useState } from 'react';
import { NoteItem } from '../types';

const NoteContext = createContext<{
  allNotes: Array<NoteItem>,
  addNote: (note: NoteItem) => void
  pinnedNotes: Array<NoteItem>,
  pinNote: (note: NoteItem) => void
}>({
    allNotes: [],
    addNote: () => {},
    pinnedNotes: [],
    pinNote: () => {},
  });

interface NoteProviderProps {
  children: React.ReactNode
}

export const NoteProvider: React.FC<NoteProviderProps> = ({ children }: NoteProviderProps) => {
  const isSavedNotes: string | null = localStorage.getItem('localNotes');
  let localNotes: Array<NoteItem>;

  if (isSavedNotes) localNotes = JSON.parse(isSavedNotes);
  else {
    localStorage.setItem("localNotes", JSON.stringify([]));
    localNotes = [];
  }

  const [ allNotes, setAllNotes ] = useState<Array<NoteItem>>(localNotes);
  const addNote = (note: NoteItem): void => {
    setAllNotes((prev) => [...prev, note])
    localNotes.push(note);
    localStorage.setItem("localNotes", JSON.stringify(localNotes));
  };

  const isPinnedNotes: string | null = localStorage.getItem('localPinnedNotes');
  let localPinnedNotes: Array<NoteItem>;

  if (isPinnedNotes) localPinnedNotes = JSON.parse(isPinnedNotes);
  else {
    localStorage.setItem("localPinnedNotes", JSON.stringify([]));
    localPinnedNotes = [];
  }

  const [ pinnedNotes, setPinnedNotes ] = useState<Array<NoteItem>>(localPinnedNotes);
  const pinNote = (note: NoteItem): void => {
    const isPinned = localPinnedNotes.find(note => note.createdAt === note.createdAt);
      
    if (!isPinned) setPinnedNotes((prev) => [...prev, note]);
    else setPinnedNotes((prev) => prev.filter(noteObj => noteObj.createdAt !== note.createdAt));

    localStorage.setItem("localPinnedNotes", JSON.stringify(localPinnedNotes));
  };

  return (
    <NoteContext.Provider 
      value={{
        allNotes,
        pinnedNotes,
        addNote,
        pinNote
      }}
    >
      { children }
    </NoteContext.Provider>
  )
}

export default NoteContext;