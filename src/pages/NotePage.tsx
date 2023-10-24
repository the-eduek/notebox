import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Note from "../types/classes/note";
import DeleteModal from "../components/DeleteModal";
import Nav from "../components/NavComponent";
import TagInput from "../components/TagInput";
import useNoteContext, {
  useDeleteNote,
  useEditNote,
} from "../context/NoteContext/hooks";

const NotePage: React.FC = () => {
  const { allNotes } = useNoteContext();
  const editNote = useEditNote();
  const deleteNote = useDeleteNote();

  // note title
  const [noteTitle, setNoteTitle] = useState<string>("");
  const noteTitleRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTitleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    evt
  ) => {
    let newTitle = evt.target.value;
    const isTrimmed =
      noteTitle.charAt(noteTitle.length - 1) === " " &&
      newTitle.charAt(newTitle.length - 1) === " ";

    if (newTitle.length > 100) newTitle = newTitle.slice(0, 101);
    if (isTrimmed) newTitle = noteTitle;

    noteObj.title = newTitle;
    setNoteTitle(() => newTitle);
    if (editing === true) triggerSubmit();
  };

  const handleTitleComplete: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    evt
  ) => {
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
  const noteContentRef = useRef<HTMLTextAreaElement | null>(null);

  const handleContentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    evt
  ) => {
    noteObj.content = evt.target.value;
    setNoteContent(() => evt.target.value);
    if (editing === true) triggerSubmit();
  };

  useEffect(() => {
    if (noteContentRef) {
      const scrollHeight = noteContentRef.current?.scrollHeight;
      scrollHeight
        ? noteContentRef.current?.style.setProperty(
            "height",
            `${scrollHeight}px`
          )
        : null;
    }
  }, [noteContent]);

  // note tags
  const [noteTags, setNoteTags] = useState<Array<string>>([]);

  const updateNoteTags = (newNoteTags: Array<string>): void => {
    noteObj.tags = newNoteTags;
    setNoteTags(() => newNoteTags);
    if (editing === true) triggerSubmit();
  };

  // delete note
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = (): void => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const setDeleteAction = (action: boolean): void => {
    action ? (deleteNote(noteObj), navigate("/")) : toggleModal();
  };

  useEffect(() => {
    showModal
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [showModal]);

  useEffect(() => {
    const handleDelKey: EventListener = (evt) => {
      const isKeyboardEvent = evt instanceof KeyboardEvent;

      if (isKeyboardEvent && evt.key.toLowerCase() === "delete") {
        if (showModal === false) toggleModal();
      }
    };

    const handleEscKey: EventListener = (evt) => {
      const isKeyboardEvent = evt instanceof KeyboardEvent;

      if (isKeyboardEvent && evt.key.toLowerCase() === "escape") {
        if (showModal === true) toggleModal();
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleDelKey);
      window.addEventListener("keydown", handleEscKey);

      return () => {
        window.removeEventListener("keydown", handleDelKey);
        window.removeEventListener("keydown", handleEscKey);
      };
    }
  }, [showModal]);

  // toggle editing state
  const [editing, setEditing] = useState<boolean>(false);

  const toggleEdit: React.MouseEventHandler<HTMLButtonElement> = () => {
    setEditing((prevEditState) => !prevEditState);
  };

  useEffect(() => {
    editing ? noteTitleRef.current?.focus() : null;
  }, [editing]);

  // edit note
  const formElt = useRef<HTMLFormElement | null>(null);

  const triggerSubmit = (): void => {
    const submitEvt: Event = new Event("submit", {
      bubbles: true,
    });
    formElt.current?.dispatchEvent(submitEvt);
  };

  const handleExitNote = (): void => {
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

  const note = allNotes.find((noteParam) => noteId === noteParam.id.toString());

  useEffect(() => {
    if (!note) navigate("/notes/error");
    else {
      setNoteTitle(noteObj.title);
      setNoteContent(noteObj.content);
      setNoteTags(noteObj.tags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!note) return null;

  // note object
  const noteObj = new Note(note.createdAt, note.content, note.title, note.tags);

  return (
    <section className="max-w-4xl mx-auto min-h-screen pb-20 px-8 sm:px-10 md:px-20 pt-16">
      <div className="flex items-center pb-14 pt-6 md:pt-12">
        <div className="flex-grow">
          <Nav
            triggerSubmit={handleExitNote}
            currentNote={noteObj}
          />
        </div>

        <button
          className={`${editing && "bg-neutral-500/[0.25]"}
            h-10 ml-5 p-1.5 rounded-full transition w-10`}
          onClick={toggleEdit}
          title="Edit Note"
          type="button"
        >
          <svg className="h-full w-full">
            <use xlinkHref="/sprites.svg#writinghand"></use>
          </svg>
        </button>

        <button
          className={`${showModal && "bg-neutral-500/[0.25]"}
            h-10 ml-5 p-1.5 rounded-full transition w-10`}
          onClick={() => toggleModal()}
          title="Delete Note"
          type="button"
        >
          <svg className="h-full w-full">
            <use xlinkHref="/sprites.svg#bin"></use>
          </svg>
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

        <p className="flex items-center pb-5 pt-3.5">
          <span className="mb-1 pr-1">
            <svg className="h-[1.375rem] w-[1.375rem]">
              <use xlinkHref="/sprites.svg#calendar"></use>
            </svg>
          </span>
          <span className="text-neutral-500">{noteObj.dateString}</span>
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

      {showModal && <DeleteModal setDeleteAction={setDeleteAction} />}
    </section>
  );
};

export default NotePage;
