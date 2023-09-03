import React, { useContext } from "react";
import { NoteItem } from "../types";
import ViewContext from "../context/ViewContext";
import NotePreview from "./NotePreview";

interface NotesListProps {
  listTitle: string;
  showListTitle?: boolean;
  notesArray: Array<NoteItem>;
}

const NotesList: React.FC<NotesListProps> = ({
  listTitle,
  showListTitle = true,
  notesArray,
}: NotesListProps) => {
  const { notesView } = useContext(ViewContext);

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
