import React, { useContext } from "react";
import { NoteItem } from "../types";
import ViewContext from "../context/ViewContext";
import NotePreview from "./NotePreview";

interface NotesListProps {
  notesArray: Array<NoteItem>
}

const NotesList: React.FC<NotesListProps> = ({ notesArray }: NotesListProps) => {
  const {
    notesView
  } = useContext(ViewContext);

  return (
    <>
      { notesView === "grid"
        ? <div className="gap-4 grid grid-cols-[repeat(2,minmax(0,1fr))]">
            <div>
              { notesArray.filter((_, index) => (index % 2 === 0)).map((note, index) => (
                  <div className="mb-4" key={index}>
                    <NotePreview note={note} />
                  </div>
                ))
              }
            </div>

            <div>
              { notesArray.filter((_, index) => (index % 2 !== 0)).map((note, index) => (
                  <div className="mb-4" key={index}>
                    <NotePreview note={note} />
                  </div>
                ))
              }
            </div>     
          </div>
        : <div>
            { notesArray.map((note, index) => (
                <div className="mb-4" key={index}>
                  <NotePreview note={note} />
                </div>
              ))
            }
          </div>
      }
    </>
  )
};

export default NotesList;