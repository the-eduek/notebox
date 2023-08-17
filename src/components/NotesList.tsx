import React, { useContext } from "react";
import { NoteItem, ViewType } from "../types";
import { ViewContext } from "../context/ViewContext";
import NotePreview from "./NotePreview";

interface NotesListProps {
  notesArray: Array<NoteItem>
}

const NotesList: React.FC<NotesListProps> = ({ notesArray }: NotesListProps) => {
  const noteView: ViewType = useContext(ViewContext);

  return (
    <>
      { noteView === "grid"
        ? <div className="gap-3 grid grid-cols-[repeat(2,minmax(0,1fr))]">
            <div>
              { notesArray.filter((_, index) => (index % 2 === 0)).map((note, index) => (
                  <div className="mb-3" key={index}>
                    <NotePreview note={note} />
                  </div>
                ))
              }
            </div>

            <div>
              { notesArray.filter((_, index) => (index % 2 !== 0)).map((note, index) => (
                  <div className="mb-3" key={index}>
                    <NotePreview note={note} />
                  </div>
                ))
              }
            </div>     
          </div>
        : <div>
            { notesArray.map((note, index) => (
                <div className="mb-3" key={index}>
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