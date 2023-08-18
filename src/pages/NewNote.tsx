import React, { useEffect, useRef, useState } from 'react';
import useResizeTextarea from '../hooks/useResizeTextarea';
import Nav from '../components/NavComponet';
import Note from '../types/classes/note';
import useLocalStorage from '../hooks/useLocalStorage';

const NewNote: React.FC = () => {
  const [ noteTitle, setNoteTitle ] = useState<string>("");

  const handleSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault();
    console.log(noteTitle, noteContent)
  };

  const handleTitleChange = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key.toLowerCase() === "enter") textAreaRef.current?.focus();
  };

  // note content
  const [ noteContent, setNoteContent ] = useState<string>("");
  const textAreaRef =  useRef<HTMLTextAreaElement>(null);

  useResizeTextarea(textAreaRef.current, noteContent);

  const handleContentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = evt.target.value;
    setNoteContent(newText);
  };

  // creating note object
  const immediateTime = new Date();

  const noteObj = new Note(
    immediateTime,
    noteContent,
    noteTitle,
  );
  
  // editing note tags
  const [ tagInput, setTagInput] = useState<string>('');
  const [ noteTags, setNoteTags ] = useState<Array<string>>(noteObj?.tags ?? []);

  const hanldleTagSubmit = (evt: React.KeyboardEvent<HTMLInputElement>): void => {
    const trimmedInput: string = tagInput.trim();
    const keyToCreate: boolean = evt.key === ',' || evt.key.toLowerCase() === "enter";

    if (keyToCreate && trimmedInput.length > 2 && trimmedInput.length < 21 && !noteTags.includes(trimmedInput)) {
      evt.preventDefault();
      setNoteTags(prevState => [...prevState, trimmedInput]);
      setTagInput("");
    }

    if (evt.key.toLowerCase() === "backspace" && !tagInput.length && noteTags.length) {
      evt.preventDefault();
      const tagsCopy: Array<string> = [...noteTags];
      const poppedTag = tagsCopy.pop();
  
      setNoteTags(tagsCopy);
      setTagInput(poppedTag!);
    }
  };

  useEffect(() => {
    noteObj.content = noteContent;
    noteObj.title = noteTitle;
    noteObj.tags = noteTags;

    return () => {
      console.log(noteObj)
    };
  }, [ noteObj ]);

  
  useLocalStorage();

  return (
    <section className="min-h-screen pb-16 px-8">
      <div className="pb-14 pt-10">
        <Nav />
      </div>

      <form onSubmit={(evt: React.FormEvent<HTMLFormElement>) => handleSubmit(evt)}>
        <div>
          <input 
            className="bg-transparent font-newsreader font-medium h-full outline-none text-3xl w-full"
            onChange={(evt) => setNoteTitle(evt.target.value)}
            onKeyDown={handleTitleChange}
            placeholder="Enter note tile"
            title="Note Title"
            type="text"
            value={noteTitle}
          />
        </div>

        <p className="pb-5 pt-3.5 text-neutral-500 text-sm">
          <span className="pr-1">🗓️</span>
          { noteObj.dateString }
        </p>

        <div>
          <ul className="flex flex-wrap items-center">
            { noteTags.map((tag: string, index: number) => (
                <li
                  className="bg-neutral-200/70 font-medium mr-2 last:mr-0 my-1 px-2 py-1 rounded-full text-sm text-neutral-600" 
                  key={index}
                >
                  <span className="text-neutral-500/80">#</span>{tag}
                </li>
              ))
            }

            { noteObj.tags &&
              <div className="flex flex-1 min-w-[5.5rem]">
                 <input 
                  className="bg-transparent h-full outline-none my-1 py-1 w-full"
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setTagInput(evt.target.value)}
                  onKeyDown={(evt: React.KeyboardEvent<HTMLInputElement>) => hanldleTagSubmit(evt)}
                  placeholder="Enter a tag"
                  type="text"
                  value={tagInput}
                />                
              </div>
            }            
          </ul>
        </div>

        <div className="flex pt-5">
          <textarea
            className="bg-transparent break-words min-h-[calc(100vh-21rem)] outline-none overflow-hidden resize-none w-full"
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