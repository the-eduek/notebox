import { createContext, useState } from 'react';
import { NoteItem } from '../types';

const NoteContext = createContext<{
  allNotes: Array<NoteItem>,
  addNote: (note: NoteItem, pinAction?: boolean) => void
  pinnedNotes: Array<number>,
  togglePinNote: (note: NoteItem, pin: boolean) => void,
  editNote: (note: NoteItem) => void,
  deleteNote: (note: NoteItem) => void,
  allTags: Array<string>
}>({
  allNotes: [],
  addNote: () => {},
  pinnedNotes: [],
  togglePinNote: () => {},
  editNote: () => {},
  deleteNote: () => {},
  allTags: []
});

interface NoteProviderProps {
  children: React.ReactNode
}

function createLocalArray<Type> (
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

function setLocalArray<Type> (
  variableName: string,
  newValue: Array<Type>
): void {
  localStorage.setItem(variableName, JSON.stringify(newValue));
}

export const NoteProvider: React.FC<NoteProviderProps> = ({ children }: NoteProviderProps) => {
  // all notes
  const localNotes: Array<NoteItem> = createLocalArray<NoteItem>('localNotes');

  const [ allNotes, setAllNotes ] = useState<Array<NoteItem>>(localNotes);

  const addNote = (noteParam: NoteItem): void => {
    const newAllNotes = [...allNotes, noteParam];
    setAllNotes(newAllNotes);
    setLocalArray<NoteItem>("localNotes", newAllNotes);
  };

  // pinning notes
  const localPinnedNotes: Array<number> = createLocalArray<number>('localPinnedNotes');

  const [ pinnedNotes, setPinnedNotes ] = useState<Array<number>>(localPinnedNotes);

  const togglePinNote = (note: NoteItem, pin: boolean): void => {
    // do not process pining if not isn't created, i.e. in new note page
    if (!note.content && !allNotes.find(noteParam => noteParam.id === note.id)) return;

    // toggle pinning
    let newPinnedNotes: Array<number>;

    if (pin) newPinnedNotes = pinnedNotes.filter(noteId => noteId !== note.id);
    else newPinnedNotes = [...pinnedNotes, note.id]
  
    setPinnedNotes(newPinnedNotes);
    setLocalArray<number>("localPinnedNotes", newPinnedNotes);
  };
  
  // editing note
  const editNote = (note: NoteItem): void => {
    const canEditIndex: number = allNotes.findIndex(noteParam => noteParam.id === note.id);

    if (canEditIndex !== -1) {
      const newAllNotes = [...allNotes.filter((noteParam) => noteParam.id !== note.id), note]

      setAllNotes(newAllNotes);
      setLocalArray<NoteItem>("localNotes", newAllNotes);
    }
  };

  // deleting notes
  const deleteNote = (noteParam: NoteItem) => {
    const newAllNotes = allNotes.filter(note => {
      return new Date(note.createdAt).getTime() !== new Date(noteParam.createdAt).getTime()
    });

    setAllNotes(newAllNotes);
    localStorage.setItem("localNotes", JSON.stringify(newAllNotes));
  };

  // all tags
  const allTags = allNotes.map(note => note.tags ?? [])  
      .flat()
      .filter((tag, index, tagsArray) => tagsArray.indexOf(tag) === index);

  return (
    <NoteContext.Provider 
      value={{
        allNotes,
        pinnedNotes,
        addNote,
        togglePinNote,
        editNote,
        deleteNote,
        allTags
      }}
    >
      { children }
    </NoteContext.Provider>
  );
};

export default NoteContext;