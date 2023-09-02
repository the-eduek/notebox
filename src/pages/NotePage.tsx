import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ModalAction, NoteItem } from "../types";
import Note from "../types/classes/note";
import NoteContext from "../context/NoteContext";
import Bin from "../components/images/Bin";
import DeleteModal from "../components/DeleteModal";
import Nav from "../components/NavComponent";
import TagInput from "../components/TagInput";
import WritingHand from "../components/images/WritingHand";

const NotePage: React.FC = () => {
  const { allNotes, editNote, deleteNote } = useContext(NoteContext);

  // note title
  const [noteTitle, setNoteTitle] = useState<string>("");
  const noteTitleRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTitleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    evt
  ): void => {
    let newTitle: string = evt.target.value;
    if (
      noteTitle.charAt(noteTitle.length - 1) === " " &&
      newTitle.charAt(newTitle.length - 1) === " "
    ) {
      newTitle = noteTitle;
    }

    if (newTitle.length > 100) newTitle = newTitle.slice(0, 101);
    noteObj.title = newTitle;
    setNoteTitle(newTitle);

    if (editing === true) triggerSubmit();
  };

  const handleTitleComplete: React.KeyboardEventHandler<HTMLTextAreaElement> = (evt) => {
    if (evt.key.toLowerCase() === "enter") noteContentRef.current?.focus();
  };

  useEffect(() => {
    if (noteTitleRef.current) {
      noteTitleRef.current.style.height = `0px`;
      const scrollHeight: number = noteTitleRef.current.scrollHeight;
      if (scrollHeight)
        noteTitleRef.current.style.setProperty("height", `${scrollHeight}px`);
    }
  }, [noteTitle]);

  // note content
  const [noteContent, setNoteContent] = useState<string>("");
  const noteContentRef = useRef<HTMLTextAreaElement | null>(null);

  const handleContentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    const newText = evt.target.value;
    noteObj.content = newText;
    setNoteContent(newText);
    if (editing === true) triggerSubmit();
  };

  useEffect(() => {
    if (noteContentRef) {
      const scrollHeight: number | undefined = noteContentRef.current?.scrollHeight;
      if (scrollHeight)
        noteContentRef.current?.style.setProperty("height", `${scrollHeight}px`);
    }
  }, [noteContent]);

  // note tags
  const [noteTags, setNoteTags] = useState<Array<string>>([]);

  const updateNoteTags = (newNoteTags: Array<string>): void => {
    noteObj.tags = newNoteTags;
    setNoteTags(newNoteTags);

    if (editing === true) triggerSubmit();
  };

  // delete note
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = (): void => {
    setShowModal(!showModal);

    if (!showModal) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  };

  const setModalAction = (action?: ModalAction): void => {
    if (action === 1) {
      document.body.classList.remove("overflow-hidden");
      deleteNote(noteObj);
      navigate("/");
    } else toggleModal();
  };

  // toggle editing state
  const [editing, setEditing] = useState<boolean>(false);

  const editPage = (): void => {
    setEditing(!editing);
    if (!editing) noteTitleRef.current?.focus();
  };

  // edit note
  const formElt = useRef<HTMLFormElement | null>(null);

  const triggerSubmit = (): void => {
    const submitEvt: Event = new Event("submit", {
      bubbles: true,
    });
    formElt.current?.dispatchEvent(submitEvt);
  };

  const triggerSubmitAndClose = (): void => {
    triggerSubmit();
    navigate("/");
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();

    noteObj.title = noteObj.title?.trim();
    noteObj.content = noteObj.content.trimEnd();
    editNote(noteObj);
  };

  // get current note
  const { noteId } = useParams();
  const navigate = useNavigate();

  const note: NoteItem | undefined = allNotes.find((noteParam) => noteId === noteParam.id.toString());

  useEffect(() => {
    if (!note) navigate("/notes/error");
    else {
      setNoteTitle(noteObj.title!);
      setNoteContent(noteObj.content);
      setNoteTags(noteObj.tags!);
    }
  }, []);

  if (!note) return null;

  // note object
  const noteObj: Note = new Note(note.createdAt, note.content, note.title, note.tags);

  return (
    <section className="max-w-4xl mx-auto min-h-screen pb-20 px-8 sm:px-10 md:px-20 pt-16">
      <div className="flex items-center pb-14 pt-6 md:pt-12">
        <div className="flex-grow">
          <Nav
            triggerSubmit={triggerSubmitAndClose}
            currentNote={noteObj}
          />
        </div>

        <button
          className={`${editing && "bg-neutral-500/[0.25]"}
            h-10 ml-5 p-1.5 rounded-full transition w-10`}
          onClick={editPage}
          title="Edit Note"
          type="button"
        >
          <WritingHand />
        </button>

        <button
          className={`${showModal && "bg-neutral-500/[0.25]"}
            h-10 ml-5 p-1.5 rounded-full transition w-10`}
          onClick={toggleModal}
          title="Delete Note"
          type="button"
        >
          <Bin />
        </button>
      </div>

      <form
        onSubmit={handleFormSubmit}
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
            readOnly={!editing}
          />
        </div>

        <p className="pb-5 pt-3.5 text-neutral-500">
          <span className="pr-1">🗓️</span>
          {noteObj.dateString}
        </p>

        <TagInput
          canEdit={editing}
          tags={noteTags}
          updateTags={updateNoteTags}
        />

        <div className="flex pt-5">
          <textarea
            className="bg-transparent break-words min-h-[calc(100vh-21.5rem)] outline-none overflow-hidden resize-none text-lg w-full"
            onChange={handleContentChange}
            placeholder="Type Note"
            ref={noteContentRef}
            readOnly={!editing}
            title="Note Content"
            value={noteContent}
          />
        </div>
      </form>

      {showModal && <DeleteModal setModalAction={setModalAction} />}
    </section>
  );
};

export default NotePage;
