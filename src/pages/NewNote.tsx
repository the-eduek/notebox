import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Note from "../types/classes/note";
import Nav from "../components/NavComponent";
import TagInput from "../components/TagInput";
import useAddNote from "../context/NoteContext/hooks/useAddNote";
import useTogglePinnedNote from "../context/NoteContext/hooks/useTogglePinnedNote";

const NewNote: React.FC = () => {
  const addNote = useAddNote();
  const togglePinnedNote = useTogglePinnedNote();

  // note title
  const [noteTitle, setNoteTitle] = useState<string>("");
  const noteTitleRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTitleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    let newTitle = evt.target.value;
    const isTrimmed =
      noteTitle.charAt(noteTitle.length - 1) === " " &&
      newTitle.charAt(newTitle.length - 1) === " ";

    if (newTitle.length > 100) newTitle = newTitle.slice(0, 101);
    if (isTrimmed) newTitle = noteTitle;

    noteObj.title = newTitle;
    setNoteTitle(() => newTitle);
  };

  const handleTitleComplete: React.KeyboardEventHandler<HTMLTextAreaElement> = (evt) => {
    if (evt.key.toLowerCase() === "enter") noteContentRef.current?.focus();
  };

  useEffect(() => {
    if (noteTitleRef.current) {
      noteTitleRef.current.style.height = `0px`;
      const scrollHeight = noteTitleRef.current.scrollHeight;
      if (scrollHeight)
        noteTitleRef.current.style.setProperty("height", `${scrollHeight}px`);
    }
  }, [noteTitle]);

  // note content
  const [noteContent, setNoteContent] = useState<string>("");
  const noteContentRef = useRef<HTMLTextAreaElement>(null);

  const handleContentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    noteObj.content = evt.target.value;
    setNoteContent(evt.target.value);
  };

  useEffect(() => {
    if (noteContentRef.current) {
      const scrollHeight = noteContentRef.current.scrollHeight;
      if (scrollHeight)
        noteContentRef.current.style.setProperty("height", `${scrollHeight}px`);
    }
  }, [noteContent]);

  // note tags
  const [noteTags, setNoteTags] = useState<Array<string>>([]);

  const updateNoteTags = (newNoteTags: Array<string>) => {
    noteObj.tags = newNoteTags;
    setNoteTags(() => newNoteTags);
  };

  // creating note and note object
  const formElt = useRef<HTMLFormElement | null>(null);
  const navigate = useNavigate();
  const immediateTime = new Date();

  const noteObj = new Note(immediateTime, noteContent, noteTitle, noteTags);

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();

    if (noteObj.content.trim()) {
      noteObj.title = noteObj.title?.trim();
      noteObj.content = noteObj.content.trimEnd();
      addNote(noteObj);
    }
  };

  const triggerSubmit = (): void => {
    const submitEvt: Event = new Event("submit", {
      bubbles: true,
    });
    formElt.current?.dispatchEvent(submitEvt);
  };

  const handlePinned = (pinStatus?: boolean): void => {
    triggerSubmit();

    // pin note if 'pin note' was selected, i,e current pin state is false
    if (pinStatus) togglePinnedNote(noteObj, false);
    navigate("/");
  };

  return (
    <section className="max-w-4xl mx-auto min-h-screen pb-20 px-8 sm:px-10 md:px-20 pt-16">
      <div className="pb-14 pt-4 md:pt-12">
        <Nav
          triggerSubmit={handlePinned}
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

        <p className="flex items-center pb-5 pt-3.5">
          <span className="mb-1 pr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[1.375rem] w-[1.375rem]"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="#404040"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M3 10h18M7 3v2m10-2v2M6.2 21h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C21 19.48 21 18.92 21 17.8V8.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C19.48 5 18.92 5 17.8 5H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 6.52 3 7.08 3 8.2v9.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 21 5.08 21 6.2 21Z"
              />
            </svg>
          </span>
          <span className="text-neutral-500">{noteObj.dateString}</span>
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
