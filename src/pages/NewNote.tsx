import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/NavComponet';
import Note from '../types/classes/note';
import NoteContext from '../context/NoteContext';

const NewNote: React.FC = () => {
  const {
    addNote,
    togglePinNote
  } = useContext(NoteContext)

  const [ noteTitle, setNoteTitle ] = useState<string>("");

  const handleTitleChange = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key.toLowerCase() === "enter") textAreaRef.current?.focus();
  };

  // note content
  const [ noteContent, setNoteContent ] = useState<string>("");
  const textAreaRef =  useRef<HTMLTextAreaElement>(null);

  const handleContentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = evt.target.value;
    setNoteContent(newText);
  };

  // resize text area automatically
  useEffect(() => {
    if (textAreaRef) {
      const scrollHeight: number | undefined = textAreaRef.current?.scrollHeight;
      if (scrollHeight) textAreaRef.current?.style.setProperty('height', `${scrollHeight}px`);
    }
  }, [textAreaRef, noteContent]);

  // creating note object
  const immediateTime = new Date();

  const noteObj = new Note(
    immediateTime,
    noteContent,
    noteTitle
  );
  
  // editing note tags
  const [ tagInput, setTagInput] = useState<string>('');
  const [ noteTags, setNoteTags ] = useState<Array<string>>(noteObj?.tags ?? []);

  const formElt = useRef<HTMLFormElement | null>(null);

  const hanldleTagSubmit = (evt: React.KeyboardEvent<HTMLInputElement>): void => {
    const trimmedInput: string = tagInput.trim();
    const keyToCreate: boolean = evt.key === ',' || evt.key.toLowerCase() === "enter" || evt.key.toLowerCase() === 'tab';

    if (keyToCreate && trimmedInput.length > 2 && trimmedInput.length < 21 && !noteTags.includes(trimmedInput)) {
      evt.preventDefault();
      setNoteTags(prevState => [...prevState, trimmedInput]);
      setTagInput("");
    }

    if (evt.key.toLowerCase() === "backspace" && !tagInput.length && noteTags.length) {
      evt.preventDefault();
      const newNoteTag: Array<string> = [...noteTags];
      const poppedTag = newNoteTag.pop();
  
      setNoteTags(newNoteTag);
      setTagInput(poppedTag!);
    }
  };

  const deleteTag = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, tag: string): void => {
    evt.preventDefault();

    const newNoteTags: Array<string> = [...noteTags.filter(tagParam => tagParam !== tag)];
    setNoteTags(newNoteTags)
  };
  
  useEffect(() => {
    noteObj.content = noteContent;
    noteObj.title = noteTitle;
    noteObj.tags = noteTags;
  }, [ noteContent, noteTitle, noteTags ]);


  // creating note  
  const navigate =  useNavigate();

  const triggerSubmit = (): void => {
    const submitEvt: Event = new Event('submit', {
      bubbles: true
    });
    formElt.current?.dispatchEvent(submitEvt);
  };

  const setSubmitAction = (checkPinned?: boolean): void => {
    triggerSubmit();

    // pin note if pin was clicked
    if (checkPinned) togglePinNote(noteObj, false);
    navigate("/");
  };

  const handleFormSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault();
    if (noteObj.content.trim()) addNote(noteObj);
  };

  return (
    <section className="max-w-4xl mx-auto min-h-screen pb-20 px-8 sm:px-10 md:px-20 pt-16">
      <div className="pb-14 pt-4 md:pt-12">
        <Nav 
          triggerSubmit={setSubmitAction}
          currentNote={noteObj}
        />
      </div>

      <form
        onSubmit={(evt: React.FormEvent<HTMLFormElement>) => handleFormSubmit(evt)}
        ref={formElt}
      >
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
                  className="bg-neutral-200/70 font-medium inline-flex items-center mr-2 last:mr-0 my-1 px-2 py-1 rounded-full text-sm text-neutral-600" 
                  key={index}
                >
                  <span className="text-neutral-500/80">#</span>
                  <span>{tag}</span>
                  <button
                    className="bg-white inline-flex h-4 items-center justify-center ml-1 rounded-full text-red-500 w-4"
                    onClick={(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => deleteTag(evt, tag)}
                    title="Delete Tag"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <g stroke="currentColor" strokeLinecap="round" strokeWidth={2.25}>
                        <path d="m14.5 9.5-5 5m0-5 5 5M7 3.338A9.954 9.954 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5"/>
                      </g>
                    </svg>
                  </button>
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
            className="bg-transparent break-words min-h-[calc(100vh-21.5rem)] outline-none overflow-hidden resize-none w-full"
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