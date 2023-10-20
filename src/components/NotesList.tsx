import React from "react";
import { NoteItem } from "../types";
import NotePreview from "./NotePreview";
import useViewContext from "../context/ViewContext/hooks";

interface NotesListProps {
  listTitle: string;
  notesArray: Array<NoteItem>;
  showListTitle?: boolean;
}

const NotesList: React.FC<NotesListProps> = ({
  listTitle,
  notesArray,
  showListTitle = true,
}: NotesListProps) => {
  const { notesView } = useViewContext();

  return (
    <section className="pb-10">
      {showListTitle && <p className="flex font-medium items-center pb-4">{listTitle}</p>}

      {notesView === "grid" ? (
        <div className="gap-4 grid grid-cols-[repeat(2,minmax(0,1fr))]">
          <div>
            {notesArray
              .filter((_, index) => index % 2 === 0)
              .map((note, index) => (
                <div
                  className="mb-4"
                  key={index}
                >
                  <NotePreview note={note} />
                </div>
              ))}
          </div>

          <div>
            {notesArray
              .filter((_, index) => index % 2 !== 0)
              .map((note, index) => (
                <div
                  className="mb-4"
                  key={index}
                >
                  <NotePreview note={note} />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div>
          {notesArray.map((note, index) => (
            <div
              className="mb-4"
              key={index}
            >
              <NotePreview note={note} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default NotesList;
