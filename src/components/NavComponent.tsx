import React, { useContext, useState } from "react";
import { NoteItem } from "../types";
import NoteContext from "../context/NoteContext";
import PushPin from "./images/PushPin";

interface NavProps {
  triggerSubmit: (pinStatus?: boolean) => void;
  currentNote: NoteItem;
}

const Nav: React.FC<NavProps> = ({ triggerSubmit, currentNote }: NavProps) => {
  const { pinnedNotes, togglePinNote } = useContext(NoteContext);

  const pinStatus = !!pinnedNotes.find((noteId) => noteId === currentNote.id);
  const [isPinned, setIsPinned] = useState<boolean>(pinStatus);

  const handlePinNote: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsPinned((prevPinState) => !prevPinState);
    togglePinNote(currentNote, isPinned);
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
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
        <PushPin />
      </button>
    </section>
  );
};

export default Nav;
