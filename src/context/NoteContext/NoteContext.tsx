import React, { createContext, useEffect, useState } from "react";
import { NoteItem } from "../../types";
import { getLocalArray, setLocalArray, validateNoteItem } from "../../utils";

interface NoteContextType {
  allNotes: Array<NoteItem>;
  setAllNotes: React.Dispatch<React.SetStateAction<Array<NoteItem>>>;
  pinnedNotes: Array<number>;
  setPinnedNotes: React.Dispatch<React.SetStateAction<Array<number>>>;
  allTags: Array<string>;
}

interface NoteContextProviderProps {
  children: React.ReactNode;
}

const NoteContext = createContext<NoteContextType | null>(null);

export const NoteContextProvider: React.FC<NoteContextProviderProps> = ({
  children,
}: NoteContextProviderProps) => {
  let localNotes = getLocalArray<NoteItem>("localNotes");
  let localPinnedNotes = getLocalArray<number>("localPinnedNotes");

  if (localNotes.length) {
    localNotes = localNotes.filter((note) => validateNoteItem(note));
    localPinnedNotes = localPinnedNotes.filter((noteId) => {
      if (typeof noteId === "number") {
        return localNotes.find((note) => note.id === noteId);
      }
    });

    setLocalArray("localNotes", localNotes);
    setLocalArray("localPinnedNotes", localPinnedNotes);
  }

  const [allTags, setAllTags] = useState<Array<string>>([]);
  const [allNotes, setAllNotes] = useState<Array<NoteItem>>(localNotes);
  const [pinnedNotes, setPinnedNotes] = useState<Array<number>>(localPinnedNotes);

  // update tags
  useEffect(() => {
    setAllTags([...new Set(allNotes.flatMap((note) => note.tags ?? []))]);
  }, [allNotes]);

  return (
    <NoteContext.Provider
      value={{
        allNotes,
        setAllNotes,
        pinnedNotes,
        setPinnedNotes,
        allTags,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
