import { createContext, useState } from 'react';
import { NoteItem } from '../types';

const NoteContext = createContext<{
  allNotes: Array<NoteItem>,
  addNote: (note: NoteItem, pinAction?: boolean) => void
  pinnedNotes: Array<number>,
  togglePinNote: (note: NoteItem, pin: boolean) => void,
  deleteNote: (note: NoteItem) => void
}>({
    allNotes: [],
    addNote: () => {},
    pinnedNotes: [],
    togglePinNote: () => {},
    deleteNote: () => {}
  });

interface NoteProviderProps {
  children: React.ReactNode
}

function createLocalArray<Type>(
  localName: string,
): Array<Type> {
  const local: string | null = localStorage.getItem(localName);
  let localArray: Array<Type>;

  if (local) localArray = JSON.parse(local);
  else {
    localStorage.setItem(localName, JSON.stringify([]));
    localArray = [];
  }

  return localArray;
}

export const NoteProvider: React.FC<NoteProviderProps> = ({ children }: NoteProviderProps) => {
  // all notes
  const localNotes: Array<NoteItem> = createLocalArray<NoteItem>('localNotes');

  const [ allNotes, setAllNotes ] = useState<Array<NoteItem>>(localNotes);

  const addNote = (noteParam: NoteItem): void => {
    const newAllNotes = [...allNotes, noteParam];
    setAllNotes(newAllNotes);
    localStorage.setItem("localNotes", JSON.stringify(newAllNotes));

    console.log(noteParam, noteParam.id)
  };

  // pinning notes
  const localPinnedNotes: Array<number> = createLocalArray<number>('localPinnedNotes');

  const [ pinnedNotes, setPinnedNotes ] = useState<Array<number>>(localPinnedNotes);

  const togglePinNote = (note: NoteItem, pin: boolean): void => {
    // do not process pining if not isn't created, i.e. in new note page
    if (!note.content && !allNotes.find(noteParam => noteParam.id === note.id)) return;

    console.log("hello")

    // toggle pinning
    let newPinnedNotes: Array<number>;

    if (pin) newPinnedNotes = pinnedNotes.filter(noteId => noteId !== note.id);
    else newPinnedNotes = [...pinnedNotes, note.id]
  
    setPinnedNotes(newPinnedNotes);
    localStorage.setItem("localPinnedNotes", JSON.stringify(newPinnedNotes));
  };

  // deleting notes
  const deleteNote = (noteParam: NoteItem) => {
    const newAllNotes = allNotes.filter(note => {
      return new Date(note.createdAt).getTime() !== new Date(noteParam.createdAt).getTime()
    });

    setAllNotes(newAllNotes);
    localStorage.setItem("localNotes", JSON.stringify(newAllNotes));
  };

  return (
    <NoteContext.Provider 
      value={{
        allNotes,
        pinnedNotes,
        addNote,
        togglePinNote,
        deleteNote
      }}
    >
      { children }
    </NoteContext.Provider>
  );
};

export default NoteContext;