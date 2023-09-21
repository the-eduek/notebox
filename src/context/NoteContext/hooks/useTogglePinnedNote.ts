import { NoteItem } from "../../../types";
import { setLocalArray } from "../../../utils";
import useNoteContext from "./useNoteContext";

export default function useTogglePinnedNote() {
  const { allNotes, pinnedNotes, setPinnedNotes } = useNoteContext();

  const togglePinnedNote = (note: NoteItem, currPinState: boolean): void => {
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

  return togglePinnedNote;
}
