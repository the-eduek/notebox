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
  }

  // note title
  const [ noteTitle, setNoteTitle ] = useState<string>(noteObj!.title ?? "");

  const handleTitleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const newTitle = evt.target.value;
    noteObj.title = newTitle.trim();
    setNoteTitle(newTitle);
    if (editing === true) triggerSubmit();
  };

  const handleTitleComplete = (evt: React.KeyboardEvent<HTMLInputElement>): void => {
    if (evt.key.toLowerCase() === "enter") textAreaRef.current?.focus();
  };

  // note content
  const [ noteContent, setNoteContent ] = useState<string>(noteObj!.content);
  
  const handleContentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newText = evt.target.value;
    noteObj.content = newText;
    setNoteContent(newText);
    if (editing === true) triggerSubmit();
  };

  // note tags
  const [ tagInput, setTagInput] = useState<string>("");
  const [ noteTags, setNoteTags ] = useState<Array<string>>(noteObj!.tags ?? []);

  const handleTagSubmit = (evt: React.KeyboardEvent<HTMLInputElement>): void => {
    let trimmedInput: string = tagInput.trim();
    let newTagsArray: Array<string> = noteObj.tags!;
    const keyToCreate: boolean = evt.key === ',' || evt.key.toLowerCase() === 'enter' || evt.key.toLowerCase() === 'tab' || evt.key === ' ';

    if (trimmedInput.startsWith('#')) trimmedInput = trimmedInput.slice(1);

    if (keyToCreate && trimmedInput.length > 1 && trimmedInput.length < 21 && !noteTags.includes(trimmedInput)) {
      newTagsArray = [...noteObj.tags!.concat(trimmedInput)];
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

  // resize text area automatically
  const textAreaRef =  useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textAreaRef) {
      const scrollHeight: number | undefined = textAreaRef.current?.scrollHeight;
      if (scrollHeight) textAreaRef.current?.style.setProperty('height', `${scrollHeight}px`);
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
    if (!editing) textAreaRef.current?.focus();
  };

  // editing note  
  const navigate =  useNavigate();
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
          <input 
            className="bg-transparent font-newsreader font-medium h-full outline-none text-3xl md:text-4xl w-full"
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => handleTitleChange(evt)}
            onKeyDown={(evt: React.KeyboardEvent<HTMLInputElement>) => handleTitleComplete(evt)}
            placeholder="Note title"
            title="Note Title"
            type="text"
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
                <div className="flex flex-1 min-w-[5.5rem]">
                  <input 
                    className="bg-transparent h-full outline-none my-1 py-1 w-full"
                    onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setTagInput(evt.target.value)}
                    onKeyDown={(evt: React.KeyboardEvent<HTMLInputElement>) => handleTagSubmit(evt)}
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
            placeholder="Type Note"
            ref={textAreaRef}
            readOnly={!editing}
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