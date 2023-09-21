import { useContext } from "react";
import NoteContext from "../NoteContext";

export default function useNoteContext() {
  const context = useContext(NoteContext);

  if (!context) {
    throw new Error("useNoteContext must be used within NoteContextProvider.");
  }

  return context;
}
