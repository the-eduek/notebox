import { NoteItem } from "../../../types";
import { setLocalArray } from "../../../utils";
import useNoteContext from "./useNoteContext";

export default function useDeleteNote() {
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
