import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NoteContext from '../context/NoteContext';
import Note from "../types/classes/note";
import Nav from '../components/NavComponet';
import Bin from '../components/images/Bin';
import WritingHand from '../components/images/WritingHand';
import DeleteModal from '../components/DeleteModal';

type ModalAction = 0 | 1;

const NotePage: React.FC = () => {
  const { noteId } = useParams();

  const {
    allNotes,
    addNote,
    deleteNote
  } = useContext(NoteContext)

  const note = allNotes.find(noteParam => {
    if (noteId) return Number(noteId) === noteParam.id;
  });

  let noteObj: Note;
  if (note) {
    noteObj = new Note(
      note.createdAt,
      note.content,
      note.title,
      note.tags
    );
  }

  const [ noteTitle, setNoteTitle ] = useState<string>(noteObj!.title ?? "");

  const handleTitleChange = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key.toLowerCase() === "enter") textAreaRef.current?.focus();
  };

  // note content
  const [ noteContent, setNoteContent ] = useState<string>(noteObj!.content);
  const textAreaRef =  useRef<HTMLTextAreaElement>(null);
  const formElt = useRef<HTMLFormElement | null>(null);
  
  // resize text area automatically
  useEffect(() => {
    if (textAreaRef) {
      const scrollHeight: number | undefined = textAreaRef.current?.scrollHeight;
      if (scrollHeight) textAreaRef.current?.style.setProperty('height', `${scrollHeight}px`);
    }
  }, [textAreaRef, noteContent]);

  const handleContentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = evt.target.value;
    setNoteContent(newText);
  };

  // allow page editing
  const [ editing, setEditing ] = useState<boolean>(false);

  const editPage = (): void => {
    setEditing(!editing);
    if (!editing) textAreaRef.current?.focus();
  };

  // editing note tags
  const [ tagInput, setTagInput] = useState<string>('');
  const [ noteTags, setNoteTags ] = useState<Array<string>>(noteObj!.tags ?? []);

  const hanldleTagSubmit = (evt: React.KeyboardEvent<HTMLInputElement>): void => {
    const trimmedInput: string = tagInput.trim();
    const keyToCreate: boolean = evt.key === ',' || evt.key.toLowerCase() === "enter" || evt.key.toLowerCase() === 'tab';

    if (keyToCreate && trimmedInput.length > 1 && trimmedInput.length < 21 && !noteTags.includes(trimmedInput)) {
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

  const deleteTag = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, tag: string): void => {
    evt.preventDefault();

    const newNoteTags: Array<string> = [...noteTags.filter(tagParam => tagParam !== tag)];
    setNoteTags(newNoteTags)
  };

  useEffect(() => {
    noteObj.content = noteContent;
    noteObj.title = noteTitle;
    noteObj.tags = noteTags;
  }, [ noteContent, noteTitle, noteTags, editing ])
  
  
  // editing note  
  const navigate =  useNavigate();

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

  const handleFormSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault();
    
    console.log(noteObj)

    if (noteObj.content) {
      const canUpdate = allNotes.find(note => note.id === note.id);
      
      console.log(noteObj)
      if (!canUpdate) addNote(noteObj);
      else {
        const currentItemIndex: number = allNotes.indexOf(canUpdate);
        allNotes.splice(currentItemIndex, 1);
        addNote(noteObj);
      }
    }
  }

  // show delete modal
  const [ showModal, setShowModal ] = useState<boolean>(false);

  const toggleModal = (): void => {
    setShowModal(!showModal);
  };

  const setModalAction = (action: ModalAction): void => {
    if (action === 0) toggleModal();
    else {
      deleteNote(noteObj);
      navigate("/")
    }
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

      <form onSubmit={(evt: React.FormEvent<HTMLFormElement>) => handleFormSubmit(evt)}>
        <div>
          <input 
            className="bg-transparent font-newsreader font-medium h-full outline-none text-3xl w-full"
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setNoteTitle(evt.target.value)}
            onKeyDown={handleTitleChange}
            placeholder="Enter note tile"
            title="Note Title"
            type="text"
            value={noteTitle}
            readOnly={!editing}
          />
        </div>

        <p className="pb-5 pt-3.5 text-neutral-500 text-sm">
          <span className="pr-1">🗓️</span>
          { noteObj!.dateString }
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

            { noteObj!.tags && editing &&
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