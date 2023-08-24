import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Note from '../types/classes/note';
import NoteContext from '../context/NoteContext';
import Nav from '../components/NavComponent';
import TagInput from '../components/TagInput';

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

  // note tags
  const [ noteTags, setNoteTags ] = useState<Array<string>>([]);

  const updateNoteTags = (newNoteTags: Array<string>) => {
    noteObj.tags = newNoteTags;
    setNoteTags(newNoteTags);
  };

  // creating note and note object
  const formElt = useRef<HTMLFormElement | null>(null);
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

    if (noteObj.content.trim()) {
      noteObj.title = noteObj.title?.trim();
      noteObj.content = noteObj.content.trimEnd();
      addNote(noteObj);
    }
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

        <TagInput
          tags={noteTags}
          updateTags={updateNoteTags}
        />

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