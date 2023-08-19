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
    let trimmedInput: string = tagInput.trim();
    if (trimmedInput.startsWith('#')) trimmedInput = trimmedInput.slice(1);

    const keyToCreate: boolean = evt.key === ',' || evt.key.toLowerCase() === "enter" || evt.key.toLowerCase() === 'tab';

    if (keyToCreate && trimmedInput.length > 1 && trimmedInput.length < 21 && !noteTags.includes(trimmedInput)) {
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
    setNoteTags(newNoteTags);
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

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    if (noteObj.content.trim()) addNote(noteObj);
  };

  const setSubmitAction = (checkPinned?: boolean): void => {
    triggerSubmit();

    // pin note if pin was clicked
    if (checkPinned) togglePinNote(noteObj, false);
    navigate("/");
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

        <p className="pb-5 pt-3.5 text-neutral-500">
          <span className="pr-1">🗓️</span>
          { noteObj.dateString }
        </p>

        <div>
          <ul className="flex flex-wrap items-center">
            { noteTags.map((tag: string, index: number) => (
                <li
                  className="bg-neutral-200/60 font-medium inline-flex items-center mr-2 last:mr-0 my-1 px-2 py-1 rounded-full text-neutral-600" 
                  key={index}
                >
                  <span className="text-neutral-500">#</span>
                  <span>{tag}</span>
                  <button
                    className="bg-neutral-500/25 inline-flex h-5 items-center justify-center ml-2 p-[3px] rounded-full w-45"
                    onClick={(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => deleteTag(evt, tag)}
                    title="Delete Tag"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#636363" className="w-full h-full">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
            className="bg-transparent break-words min-h-[calc(100vh-21.5rem)] outline-none overflow-hidden resize-none text-lg w-full"
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