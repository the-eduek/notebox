import React from "react";
import { NoteItem } from  "../types/index";
import { Link } from "react-router-dom";
import Note from "../types/classes/note";

interface NoteProps {
  note: NoteItem;
}

const NotePreview: React.FC<NoteProps> = ({ note }: NoteProps) => {
  const noteObj = new Note(
    note.createdAt,
    note.content,
    note.title,
    note.tags
  );

  return (
    <section>
      <Link
        className="bg-neutral-100/75 border border-neutral-300 flex flex-col p-3 rounded-lg self-start"
        to={`notes/${noteObj.id}`}
      >
        { note.title && 
          <h1 className="font-newsreader font-medium pb-1 text-lg">
            { note.title.length > 21 ? `${note.title.slice(0, 21)}...` : note.title }
          </h1>
        }

        <p className="break-words text-sm">
          { note.content.length > 151 ? `${note.content.slice(0, 151)}...` : note.content }
        </p>

        { note.tags &&
            <ul className="flex flex-wrap mt-1.5 pt-1.5">
              { note.tags.slice(0, 2).map((tag: string, index: number) => (
                  <li 
                    key={index}
                    className="bg-neutral-500/[0.125] flex font-bold mr-2 last:mr-0 my-1 px-2 py-1.5 rounded-full text-xs text-neutral-600/[0.8625]" 
                  >
                    <span className="font-newsreader text-neutral-600/[0.625]">#</span>
                    <span className="break-words">{ tag }</span>
                  </li>
                ))
              }
              { note.tags.slice(2).length > 0 &&
                  <li className="bg-neutral-500/[0.125] flex font-bold items-center my-1 px-2 py-1.5 rounded-full text-xs text-neutral-600/[0.8625]">
                    <span>+{ note.tags.slice(2).length }</span>
                  </li>
              } 
            </ul>
        }
      </Link>
    </section>
  );
};

export default NotePreview;