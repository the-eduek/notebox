import React from "react";
import { NoteItem } from "../types/index";
import { Link } from "react-router-dom";
import Note from "../types/classes/note";

interface NotePreviewProps {
  note: NoteItem;
}

const NotePreview: React.FC<NotePreviewProps> = ({ note }: NotePreviewProps) => {
  const noteObj = new Note(note.createdAt, note.content, note.title, note.tags);

  return (
    <section>
      <Link
        className="bg-neutral-100/50 border border-neutral-300 flex flex-col p-3 rounded-lg self-start"
        to={`/notes/${noteObj.id}`}
      >
        {!!noteObj.title && (
          <h1 className="break-words font-newsreader font-medium pb-1 text-lg">
            {noteObj.title.length > 37
              ? `${noteObj.title.slice(0, 36)}...`
              : noteObj.title}
          </h1>
        )}

        <p className="break-words">
          {noteObj.content.length ? (
            noteObj.content.length > 162 ? (
              `${noteObj.content.slice(0, 162)}...`
            ) : (
              noteObj.content
            )
          ) : (
            <span className="font-regular text-neutral-400">Empty note</span>
          )}
        </p>

        {!!noteObj.tags.length && (
          <ul className="flex flex-wrap mt-1.5 pt-1.5">
            {noteObj.tags.slice(0, 2).map((tag: string, index: number) => (
              <li
                key={index}
                className="bg-neutral-200/80 break-all flex mr-2 last:mr-0 my-1 px-2 py-1 rounded-full text-sm text-neutral-600/[0.8625]"
              >
                <span>#</span>
                <span className="font-medium">{tag}</span>
              </li>
            ))}

            {note.tags?.slice(2).length ? (
              note.tags?.slice(2).length > 1 ? (
                <li className="bg-neutral-200/80 flex font-medium items-center my-1 px-2 py-1 rounded-full text-sm text-neutral-600/80">
                  <span>+{note.tags.slice(2).length}</span>
                </li>
              ) : (
                <li className="bg-neutral-200/80 break-all flex mr-2 last:mr-0 my-1 px-2 py-1 rounded-full text-sm text-neutral-600/[0.8625]">
                  <span>#</span>
                  <span className="font-medium">{note.tags.slice(2)[0]} </span>
                </li>
              )
            ) : null}
          </ul>
        )}
      </Link>
    </section>
  );
};

export default NotePreview;
