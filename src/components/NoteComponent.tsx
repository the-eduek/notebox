import React, { useRef } from "react";
import { NoteItem } from  "../types/index";
import { Weekdays } from "../utils";

interface NoteProps {
  note: NoteItem;
}

const Note: React.FC<NoteProps> = ({ note }: NoteProps) => {
  const contentElt = useRef<HTMLDivElement>(null);

  return (
    <section className="{min-h-screen px-8 py-20">
      <div>
        { note.title &&
            <h1 className="font-newsreader font-medium text-3xl">
              { note.title }
            </h1>
        }
        
        <p className="pb-5 pt-3.5 text-neutral-500 text-sm">
          <span className="pr-1">🗓️</span>
          { Weekdays[note.createdAt.getDay()] }, 
          { note.createdAt.toDateString().substring(3) }
        </p>

        { note.tags &&
            <ul className="flex flex-wrap pb-4">
              { note.tags.map((tag: string, index: number) => (
                  <li className="bg-neutral-200/70 font-medium mr-2 last:mr-0 my-1 px-2 py-1 rounded-full text-sm text-neutral-600" key={index}>
                    <span className="text-neutral-500/80">#</span>{tag}
                  </li>
                ))
              }
            </ul>
        }
      </div>
      
      <article
        className="break-words font-light prose pt-5"
        ref={contentElt} 
        dangerouslySetInnerHTML={{ __html: note.content }}
      ></article>
    </section>
  );
};

export default Note;