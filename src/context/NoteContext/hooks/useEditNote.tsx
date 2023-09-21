import { NoteItem } from "../../../types";
import { setLocalArray } from "../../../utils";
import useNoteContext from "./useNoteContext";

export default function useEditNote() {
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
