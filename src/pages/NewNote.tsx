import React, { useRef, useState } from 'react';
import { Weekdays } from '../utils';
import useResizeTextarea from '../hooks/useResizeTextarea';
import Nav from '../components/NavComponet';

const NewNote: React.FC = () => {  
  const immediateTime = new Date();

  const [ noteTitle, setNoteTitle ] = useState<string>("");

  const handleSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault();
    console.log(noteTitle, noteContent)
  };

  const handleTitleChange = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key.toLowerCase() === "enter") textAreaRef.current?.focus();
  };

  const [ noteContent, setNoteContent ] = useState<string>("");
  const textAreaRef =  useRef<HTMLTextAreaElement>(null);

  useResizeTextarea(textAreaRef.current, noteContent);

  const handleContentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = evt.target.value;
    setNoteContent(newText);
  };

  return (
    <section className="min-h-screen pb-16 px-8">
      <Nav />

      <form onSubmit={(evt: React.FormEvent<HTMLFormElement>) => handleSubmit(evt)}>
        <div>
          <input 
            className="bg-transparent font-newsreader font-medium h-full outline-none text-3xl w-full"
            onChange={(evt) => setNoteTitle(evt.target.value)}
            onKeyUp={handleTitleChange}
            placeholder="Enter note tile"
            title="Note Title"
            type="text"
            value={noteTitle}
          />
        </div>

        <p className="pb-5 pt-3.5 text-neutral-500 text-sm">
          <span className="pr-1">🗓️</span>
          { Weekdays[immediateTime.getDay()] }, 
          { immediateTime.toDateString().substring(3) }
        </p>

        <div className="pb-8">
          <input 
            className="bg-transparent h-full outline-none text-sm w-full"
            type="text" 
            placeholder="Enter tags"
          />

          {/* <ul className="flex flex-wrap pb-4">
              { note.tags.map((tag: string, index: number) => (
                  <li className="bg-neutral-200/70 font-medium mr-2 last:mr-0 my-1 px-2 py-1 rounded-full text-sm text-neutral-600" key={index}>
                    <span className="text-neutral-500/80">#</span>{tag}
                  </li>
                ))
              }
            </ul> */}
        </div>

        <div className="flex">
          <textarea
            className="bg-transparent break-words min-h-[calc(100vh-12.5rem)] outline-none overflow-hidden resize-none w-full"
            onChange={handleContentChange}
            placeholder="Enter Note"
            ref={textAreaRef}
            value={noteContent}
          />
        </div>
      </form>
    </section>
  );
}

export default NewNote;