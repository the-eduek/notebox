import { NoteItem } from "../../../types";
import { setLocalArray } from "../../../utils";
import useNoteContext from "./useNoteContext";

export default function useAddNote() {
  const { allNotes, setAllNotes } = useNoteContext();

  const addNote = (noteParam: NoteItem): void => {
    setAllNotes((prevAllNotes) => [...prevAllNotes, noteParam]);
    setLocalArray("localNotes", [...allNotes, noteParam]);
  };

  return addNote;
}
