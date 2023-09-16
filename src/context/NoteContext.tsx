import React, { createContext, useState } from "react";
import { NoteItem } from "../types";

interface NoteContextType {
  allNotes: Array<NoteItem>;
  addNote: (note: NoteItem, pinAction?: boolean) => void;
  pinnedNotes: Array<number>;
  togglePinNote: (note: NoteItem, pin: boolean) => void;
  editNote: (note: NoteItem) => void;
  deleteNote: (note: NoteItem) => void;
  allTags: Array<string>;
}

interface NoteProviderProps {
  children: React.ReactNode;
}

const NoteContext = createContext<NoteContextType>({
  allNotes: [],
  addNote: () => {},
  pinnedNotes: [],
  togglePinNote: () => {},
  editNote: () => {},
  deleteNote: () => {},
  allTags: [],
});

function getLocalArray<T extends number | NoteItem>(localName: string): Array<T> {
  const local = localStorage.getItem(localName);
  let localArray: Array<T> = [];

  if (local) localArray = JSON.parse(local);
  else localStorage.setItem(localName, JSON.stringify([]));

  return localArray;
}

function setLocalArray<T extends number | NoteItem>(
  variableName: string,
  newValue: Array<T>
): void {
  localStorage.setItem(variableName, JSON.stringify(newValue));
}

function validateNoteItem(noteParam: NoteItem): boolean {
  const isValid =
    "content" in noteParam &&
    typeof noteParam.content === "string" &&
    "createdAt" in noteParam &&
    new Date(noteParam.createdAt) instanceof Date &&
    "id" in noteParam &&
    typeof noteParam.id === "number" &&
    "tags" in noteParam &&
    Array.isArray(noteParam.tags) &&
    noteParam.tags.every((tag: string) => typeof tag === "string") &&
    "title" in noteParam &&
    typeof noteParam.title === "string";

  return isValid
    ? new Date(noteParam.createdAt).getTime() === noteParam.id
      ? true
      : false
    : false;
}

export const NoteProvider: React.FC<NoteProviderProps> = ({
  children,
}: NoteProviderProps) => {
  // get and validate notes
  const localNotes = getLocalArray<NoteItem>("localNotes");
  let validatedLocalNotes: Array<NoteItem> = [];

  const localPinnedNotes = getLocalArray<number>("localPinnedNotes");
  let validatedPinnedNotes: Array<number> = [];

  if (localNotes.length) {
    validatedLocalNotes = localNotes.filter((note) => validateNoteItem(note));
    validatedPinnedNotes = localPinnedNotes.filter((noteId) => {
      if (typeof noteId === "number")
        return validatedLocalNotes.find((note) => note.id === noteId);
    });
    setLocalArray("localNotes", validatedLocalNotes);
    setLocalArray("localPinnedNotes", validatedPinnedNotes);
  }

  // all notes
  const [allNotes, setAllNotes] = useState<Array<NoteItem>>(validatedLocalNotes);

  const addNote = (noteParam: NoteItem): void => {
    setAllNotes((prevAllNotes) => [...prevAllNotes, noteParam]);
    setLocalArray("localNotes", [...allNotes, noteParam]);
  };

  // pinning notes
  const [pinnedNotes, setPinnedNotes] = useState<Array<number>>(validatedPinnedNotes);

  const togglePinNote = (note: NoteItem, currPinState: boolean): void => {
    function getNewArray(arr: Array<number>): Array<number> {
      return currPinState
        ? arr.filter((noteId) => noteId !== note.id)
        : [...arr, note.id];
    }

    if (allNotes.find((noteParam) => noteParam.id === note.id) || note.content) {
      setPinnedNotes((prevPinnedNotes) => getNewArray(prevPinnedNotes));
      setLocalArray("localPinnedNotes", getNewArray(pinnedNotes));
    }
  };

  // editing note
  const editNote = (note: NoteItem): void => {
    function getNewArray(arr: Array<NoteItem>): Array<NoteItem> {
      return [...arr.filter((item) => item.id !== note.id), note];
    }

    setAllNotes((prevAllNotes) => getNewArray(prevAllNotes));
    setLocalArray("localNotes", getNewArray(allNotes));
  };

  // deleting notes
  const deleteNote = (noteParam: NoteItem) => {
    function getNewArray(arr: Array<NoteItem>): Array<NoteItem> {
      return arr.filter((note) => note.id !== noteParam.id);
    }

    setAllNotes((prevAllNotes) => getNewArray(prevAllNotes));
    setLocalArray("localNotes", getNewArray(allNotes));
  };

  // all tags
  const allTags = [...new Set(allNotes.flatMap((note) => note.tags ?? []))];

  return (
    <NoteContext.Provider
      value={{
        allNotes,
        pinnedNotes,
        addNote,
        togglePinNote,
        editNote,
        deleteNote,
        allTags,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
