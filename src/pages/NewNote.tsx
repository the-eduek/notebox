import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Note from '../types/classes/note';
import NoteContext from '../context/NoteContext';
import Nav from '../components/NavComponent';

const NewNote: React.FC = () => {
  const {
    addNote,
    togglePinNote
  } = useContext(NoteContext)

  // note title
  const [ noteTitle, setNoteTitle ] = useState<string>("");
  const noteTitleRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTitleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>): void => {
    let newTitle = evt.target.value;
    if ((noteTitle.charAt(noteTitle.length - 1) === ' ') && (newTitle.charAt(newTitle.length - 1) === ' ')) {
      newTitle = noteTitle
    }
    if (newTitle.length > 100) newTitle = newTitle.slice(0, 101);
    noteObj.title = newTitle;
    setNoteTitle(newTitle);
  };

  const handleTitleComplete = (evt: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (evt.key.toLowerCase() === "enter") noteContentRef.current?.focus();
  };

  useEffect(() => {
    if (noteTitleRef.current) {
      noteTitleRef.current.style.height = `0px`;
      const scrollHeight: number = noteTitleRef.current.scrollHeight;
      if (scrollHeight) noteTitleRef.current.style.setProperty('height', `${scrollHeight}px`);
    }
  }, [ noteTitle ]);

  // note content
  const [ noteContent, setNoteContent ] = useState<string>("");
  const noteContentRef =  useRef<HTMLTextAreaElement>(null);

  const handleContentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = evt.target.value;
    noteObj.content = newText;
    setNoteContent(newText);
  };

  useEffect(() => {
    if (noteContentRef.current) {
      const scrollHeight: number = noteContentRef.current.scrollHeight;
      if (scrollHeight) noteContentRef.current.style.setProperty('height', `${scrollHeight}px`);
    }
  }, [ noteContent ]);
  
  // editing note tags
  const [ tagInput, setTagInput] = useState<string>("");
  const [ noteTags, setNoteTags ] = useState<Array<string>>([]);
  const keysToCreate: Array<string> = [ ",", "tab", "enter", " " ];

  const formElt = useRef<HTMLFormElement | null>(null);

  const handleTagInput = (evt: React.KeyboardEvent<HTMLInputElement>): void => {
    let currentText = evt.currentTarget.value.trim();
    let newTagsArray: Array<string> = noteObj.tags!;

    if (currentText.startsWith('#')) currentText = currentText.slice(1);
    const canCreate: boolean = keysToCreate.includes(evt.key.toLowerCase());

    if (canCreate && currentText.length > 1 && currentText.length < 21 && !(noteTags.includes(currentText))) {
      newTagsArray = [...noteObj.tags!.concat(currentText)];
      setTagInput("");
    }

    if (evt.key.toLowerCase() === "backspace" && !tagInput.length && noteTags.length) {
      newTagsArray = [...noteObj.tags!];
      setTagInput(newTagsArray.pop()!);
    }

    noteObj.tags = newTagsArray;
    setNoteTags(newTagsArray);
  };

  const deleteTag = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, tag: string): void => {
    evt.preventDefault();

    const newNoteTags: Array<string> = [...noteTags.filter(tagParam => tagParam !== tag)];
    noteObj.tags = newNoteTags;
    setNoteTags(newNoteTags);
  };
  
  // creating note and note object
  const navigate: NavigateFunction = useNavigate();
  const immediateTime = new Date();

  const noteObj = new Note(
    immediateTime,
    noteContent,
    noteTitle,
    noteTags
  );

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    if (noteObj.content.trim()) addNote(noteObj);
  };

  const triggerSubmit = (): void => {
    const submitEvt: Event = new Event('submit', {
      bubbles: true
    });
    formElt.current?.dispatchEvent(submitEvt);
  };

  const checkPinned = (checkPinned?: boolean): void => {
    triggerSubmit();

    // pin note if pin was clicked
    if (checkPinned) togglePinNote(noteObj, false);
    navigate("/");
  };

  return (
    <section className="max-w-4xl mx-auto min-h-screen pb-20 px-8 sm:px-10 md:px-20 pt-16">
      <div className="pb-14 pt-4 md:pt-12">
        <Nav 
          triggerSubmit={checkPinned}
          currentNote={noteObj}
        />
      </div>

      <form
        onSubmit={(evt: React.FormEvent<HTMLFormElement>) => handleFormSubmit(evt)}
        ref={formElt}
      >
        <div>
          <textarea 
            className="bg-transparent font-newsreader font-medium h-full outline-none overflow-hidden resize-none text-3xl md:text-4xl w-full"
            onChange={handleTitleChange}
            onKeyDown={handleTitleComplete}
            placeholder="Note title"
            ref={noteTitleRef}
            title="Note Title"
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
                  <span className="text-neutral-500/80">#</span>
                  <span>{tag}</span>
                  <button
                    className="bg-neutral-500/25 inline-flex h-5 items-center justify-center ml-2 p-[3px] rounded-full w-5"
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
              <li className="flex flex-1 min-w-[5.5rem]">
                 <input 
                  className="bg-transparent h-full outline-none my-1 py-1 w-full"
                  onInput={(evt: React.FormEvent<HTMLInputElement>) => setTagInput(evt.currentTarget.value)}
                  onKeyDown={handleTagInput}
                  placeholder="Enter a tag"
                  title="Note Tags"
                  type="text"
                  value={tagInput}
                />                
              </li>
            }            
          </ul>
        </div>

        <div className="flex pt-5">
          <textarea
            className="bg-transparent break-words min-h-[calc(100vh-21.5rem)] outline-none overflow-hidden resize-none text-lg w-full"
            onChange={handleContentChange}
            placeholder="Type Note"
            ref={noteContentRef}
            title="Note Content"
            value={noteContent}
          />
        </div>
      </form>
    </section>
  );
};

export default NewNote;