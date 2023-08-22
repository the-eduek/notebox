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

function validateNoteItem(noteParam: NoteItem): boolean {
  if (
    'content' in noteParam && 
    typeof noteParam.content === 'string' &&

    'createdAt' in noteParam && 
    new Date(noteParam.createdAt) instanceof Date &&

    'id' in noteParam &&
    typeof noteParam.id === 'number' &&

    'tags' in noteParam &&
    Array.isArray(noteParam.tags) &&
    noteParam.tags.every((tag: string) => typeof tag === 'string') &&

    'title' in noteParam &&
    typeof noteParam.title === 'string'
  ) {
    if (new Date(noteParam.createdAt).getTime() === noteParam.id) return true;
    else return false;
  }
  else return false;
}

export const NoteProvider: React.FC<NoteProviderProps> = ({ children }: NoteProviderProps) => {
  // get and validate notes
  const localNotes: Array<NoteItem> = createLocalArray<NoteItem>('localNotes');
  let validatedLocalNotes: Array<NoteItem> = [];

  const localPinnedNotes: Array<number> = createLocalArray<number>('localPinnedNotes');
  let validatedPinnedNotes: Array<number> = [];

  if (localNotes.length) {
    validatedLocalNotes = localNotes.filter(note => validateNoteItem(note));
    setLocalArray<NoteItem>('localNotes', validatedLocalNotes);

    validatedPinnedNotes = localPinnedNotes.filter(noteId => {
      return validatedLocalNotes.find(note => note.id === noteId);
    });
    setLocalArray<number>('localPinnedNotes', validatedPinnedNotes);
  }

  // all notes
  const [ allNotes, setAllNotes ] = useState<Array<NoteItem>>(validatedLocalNotes);

  const addNote = (noteParam: NoteItem): void => {
    const newAllNotes = [...allNotes, noteParam];
    setAllNotes(newAllNotes);
    setLocalArray<NoteItem>("localNotes", newAllNotes);
  };

  // pinning notes
  const [ pinnedNotes, setPinnedNotes ] = useState<Array<number>>(validatedPinnedNotes);

  const togglePinNote = (note: NoteItem, pin: boolean): void => {
    // do not process pining if not isn't created, i.e. in new note page
    if (!note.content && !!(allNotes.filter(noteParam => noteParam.id === note.id).length)) return;

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
      const newAllNotes = [...allNotes];
      newAllNotes.splice(canEditIndex, 1, note);

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
  const allTags = [...new Set(allNotes.flatMap(note => note.tags ?? []))];

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