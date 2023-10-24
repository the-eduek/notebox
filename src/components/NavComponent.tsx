import React, { useState } from "react";
import { NoteItem } from "../types";
import PushPin from "./images/PushPin";
import useNoteContext, {
  useTogglePinnedNote,
} from "../context/NoteContext/hooks";

interface NavProps {
  triggerSubmit: (pinStatus?: boolean) => void;
  currentNote: NoteItem;
}

const Nav: React.FC<NavProps> = ({ triggerSubmit, currentNote }: NavProps) => {
  const { pinnedNotes } = useNoteContext();
  const togglePinnedNote = useTogglePinnedNote();

  const pinStatus = !!pinnedNotes.find((noteId) => noteId === currentNote.id);
  const [isPinned, setIsPinned] = useState<boolean>(pinStatus);

  const handlePinNote: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsPinned((prevPinState) => !prevPinState);
    togglePinnedNote(currentNote, isPinned);
  };

  return (
    <section className="flex items-center justify-between">
      <div className="flex">
        <button
          className="bg-neutral-800 flex font-medium items-center px-2.5 py-2.5 rounded-full text-neutral-50"
          onClick={() => triggerSubmit(isPinned)}
          title="Go Back"
          type="button"
        >
          <svg className="h-4 w-4">
            <use xlinkHref="/sprites.svg#leftchevron"></use>
          </svg>
        </button>
      </div>

      <button
        className={`${isPinned && "bg-neutral-500/[0.25]"} ${
          !currentNote && "cursor-not-allowed opacity-50"
        } h-10 ml-5 p-1.5 rounded-full transition w-10`}
        onClick={handlePinNote}
        disabled={!currentNote}
        title="Pin Note"
        type="button"
      >
        <svg className="h-full w-full">
          <use xlinkHref="/sprites.svg#pushpin"></use>
        </svg>
      </button>
    </section>
  );
};

export default Nav;
