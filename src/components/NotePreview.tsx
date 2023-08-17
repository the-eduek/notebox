import React from "react";
import { NoteItem } from  "../types/index";

interface NoteProps {
  note: NoteItem;
}

const NotePreview: React.FC<NoteProps> = ({ note }: NoteProps) => {
  return (
    <section className="bg-neutral-100/75 border border-neutral-300 flex flex-col p-3 rounded-lg self-start">
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
                  className="bg-neutral-500/10 font-bold mr-2 last:mr-0 my-1 px-1.5 py-1 rounded-full text-xs text-neutral-600/[0.85]" 
                >
                  <span className="break-words text-neutral-600/60">#</span>
                  <span>{ tag }</span>
                </li>
              ))
            }
            { note.tags.slice(2).length > 0 &&
                <li className="bg-neutral-500/10 font-bold my-1 px-1.5 py-1 rounded-full text-xs text-neutral-600/[0.85]">
                  <span className="text-neutral-600/60">+</span>
                  <span>{ note.tags.slice(2).length }</span>
                </li>
            } 
          </ul>
      }
    </section>
  );
};

export default NotePreview;