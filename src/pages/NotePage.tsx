import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ModalAction } from "../types";
import Note from "../types/classes/note";
import NoteContext from '../context/NoteContext';
import Bin from '../components/images/Bin';
import DeleteModal from '../components/DeleteModal';
import Nav from '../components/NavComponent';
import WritingHand from '../components/images/WritingHand';

const NotePage: React.FC = () => {
  const {
    allNotes,
    editNote,
    deleteNote
  } = useContext(NoteContext)

  // get current note
  const { noteId } = useParams();
  const navigate =  useNavigate();

  const note = allNotes.filter(noteParam => {
    if (noteId) return Number(noteId) === noteParam.id;
  })[0];

  let noteObj: Note;

  if (note) {
    noteObj = new Note(
      note.createdAt,
      note.content,
      note.title,
      note.tags
    );
  } else navigate("/");

  // note title
  const [ noteTitle, setNoteTitle ] = useState<string>(noteObj!.title ?? "");
  const noteTitleRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTitleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>): void => {
    let newTitle = evt.target.value;
    if ((noteTitle.charAt(noteTitle.length - 1) === ' ') && (newTitle.charAt(newTitle.length - 1) === ' ')) {
      newTitle = noteTitle
    }
    if (newTitle.length > 100) newTitle = newTitle.slice(0, 101);
    noteObj.title = newTitle;
    setNoteTitle(newTitle);

    if (editing === true) triggerSubmit();
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
  const [ noteContent, setNoteContent ] = useState<string>(noteObj!.content);  
  const noteContentRef =  useRef<HTMLTextAreaElement | null>(null);

  const handleContentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newText = evt.target.value;
    noteObj.content = newText;
    setNoteContent(newText);
    if (editing === true) triggerSubmit();
  };

  // note tags
  const [ tagInput, setTagInput] = useState<string>("");
  const [ noteTags, setNoteTags ] = useState<Array<string>>(noteObj!.tags ?? []);
  const keysToCreate: Array<string> = [ ",", "tab", "enter", " " ];

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
    if (editing === true) triggerSubmit();
  };

  const deleteTag = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, tag: string): void => {
    evt.preventDefault();

    if (editing) {
      const newNoteTags: Array<string> = [...noteTags.filter(tagParam => tagParam !== tag)];
      noteObj.tags = newNoteTags;
      setNoteTags(newNoteTags);
      triggerSubmit();
    }
  };

  useEffect(() => {
    if (noteContentRef) {
      const scrollHeight: number | undefined = noteContentRef.current?.scrollHeight;
      if (scrollHeight) noteContentRef.current?.style.setProperty('height', `${scrollHeight}px`);
    }
  }, [ noteContent ]);

  // delete note
  const [ showModal, setShowModal ] = useState<boolean>(false);

  const toggleModal = (): void => {
    setShowModal(!showModal);

    if (!showModal) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
  };

  const setModalAction = (action?: ModalAction): void => {
    if (action === 1) {
      document.body.classList.remove('overflow-hidden');
      deleteNote(noteObj);
      navigate("/");
    } else toggleModal();
  };

  // open page editing
  const [ editing, setEditing ] = useState<boolean>(false);

  const editPage = (): void => {
    setEditing(!editing);
    if (!editing) noteContentRef.current?.focus();
  };

  // editing note
  const formElt = useRef<HTMLFormElement | null>(null);

  const triggerSubmit = (): void => {
    const submitEvt: Event = new Event('submit', {
      bubbles: true
    });
    formElt.current?.dispatchEvent(submitEvt);
  };

  const triggerSubmitAndClose = (): void => {
    triggerSubmit();
    navigate("/");
  };

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    editNote(noteObj);
  };

  return (
    <section className="max-w-4xl mx-auto min-h-screen pb-20 px-8 sm:px-10 md:px-20 pt-16">
      <div className="flex items-center pb-14 pt-6 md:pt-12">
        <div className="flex-grow">
          <Nav 
            triggerSubmit={triggerSubmitAndClose}
            currentNote={noteObj!}
          />
        </div>

        <button 
          className={`${ editing && 'bg-neutral-500/[0.25]'} h-10 ml-5 p-1.5 rounded-full transition w-10`}
          onClick={editPage}
          title="Edit Note"
          type="button"
        >
          <WritingHand />
        </button>

        <button 
          className={`${ showModal && 'bg-neutral-500/[0.25]'} h-10 ml-5 p-1.5 rounded-full transition w-10`}
          onClick={toggleModal}
          title="Delete Note"
          type="button"
        >
          <Bin />
        </button>
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
            readOnly={!editing}
          />
        </div>

        <p className="pb-5 pt-3.5 text-neutral-500">
          <span className="pr-1">🗓️</span>
          { noteObj!.dateString }
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
                    className={`${ !editing && 'hover:cursor-not-allowed'} bg-neutral-500/25 inline-flex h-5 items-center justify-center ml-2 p-[3px] rounded-full w-5`}
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

            { noteObj!.tags && editing &&
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
            readOnly={!editing}
            title="Note Content"
            value={noteContent}
          />
        </div>
      </form>

      { showModal &&
          <DeleteModal 
            setModalAction={setModalAction}
          />
      }
    </section>
  );
};

export default NotePage;