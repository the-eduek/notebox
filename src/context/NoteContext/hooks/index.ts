import { useContext } from "react";
import { NoteItem } from "../../../types";
import { setLocalArray } from "../../../utils";
import { NoteContext } from "../NoteContext";

export default function useNoteContext() {
  const context = useContext(NoteContext);

  if (!context) {
    throw new Error("useNoteContext must be used within NoteContextProvider.");
  }

  return context;
}

export function useAddNote() {
  const { allNotes, setAllNotes } = useNoteContext();

  const addNote = (noteParam: NoteItem): void => {
    setAllNotes((prevAllNotes) => [...prevAllNotes, noteParam]);
    setLocalArray("localNotes", [...allNotes, noteParam]);
  };

  return addNote;
}

export function useDeleteNote() {
  const { allNotes, setAllNotes } = useNoteContext();

  const deleteNote = (noteParam: NoteItem) => {
    function getNewArray(arr: Array<NoteItem>): Array<NoteItem> {
      return arr.filter((note) => note.id !== noteParam.id);
    }

    setAllNotes((prevAllNotes) => getNewArray(prevAllNotes));
    setLocalArray("localNotes", getNewArray(allNotes));
  };

  return deleteNote;
}

export function useEditNote() {
  const { allNotes, setAllNotes } = useNoteContext();

  const editNote = (note: NoteItem): void => {
    function getNewArray(arr: Array<NoteItem>): Array<NoteItem> {
      return [...arr.filter((item) => item.id !== note.id), note];
    }

    setAllNotes((prevAllNotes) => getNewArray(prevAllNotes));
    setLocalArray("localNotes", getNewArray(allNotes));
  };

  return editNote;
}

export function useTogglePinnedNote() {
  const { allNotes, pinnedNotes, setPinnedNotes } = useNoteContext();

  const togglePinnedNote = (note: NoteItem, currPinState: boolean): void => {
    function getNewArray(arr: Array<number>): Array<number> {
      return currPinState
        ? arr.filter((noteId) => noteId !== note.id)
        : [...arr, note.id];
    }

    if (
      allNotes.find((noteParam) => noteParam.id === note.id) ||
      note.content
    ) {
      setPinnedNotes((prevPinnedNotes) => getNewArray(prevPinnedNotes));
      setLocalArray("localPinnedNotes", getNewArray(pinnedNotes));
    }
  };

  return togglePinnedNote;
}
