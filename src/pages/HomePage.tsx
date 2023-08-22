import React, { useContext, useRef, useState } from "react";
import { NoteItem } from "../types";
import { Link } from "react-router-dom";
import ViewContext from "../context/ViewContext";
import NoteContext from "../context/NoteContext";
import BottomNav from "../components/BottomNav";
import NotesList from "../components/NotesList";
import Notepad from "../components/images/Notepad";
import TagsMenu from "../components/TagsMenu";
import SearchComponent from "../components/SearchComponent";

const HomePage: React.FC = () => {
  const {
    allNotes,
    pinnedNotes
  } = useContext(NoteContext);

  // grid / list view
  const {
    notesView,
    updateView
  } = useContext(ViewContext);

  // sorting
  const notes: Array<NoteItem> = allNotes.filter(note => !pinnedNotes.some(pinnedNoteId => pinnedNoteId === note.id))
    .sort((noteX, noteY) => noteY.id - noteX.id);

  const pinned: Array<NoteItem> = allNotes.filter(note => pinnedNotes.find(noteId => noteId === note.id))
    .sort((noteX, noteY) => noteY.id - noteX.id);
      
  // const [ searchText, setSearchText ] = useState<string>("");
  const [ notesArray, setNotesArray ] = useState<Array<NoteItem>>(notes);
  const [ pinnedNotesArray, setPinnedNotesArray ] = useState<Array<NoteItem>>(pinned);

  const handleSearch = (searchText: string): void => {
    searchText = searchText.trim();

    if (searchText.startsWith("#")) {
      const newNotesArray: Array<NoteItem> = notes.filter(note => {
        return !!(note.tags?.filter(tag => tag.includes(searchText.slice(1))).length)
      });
      setNotesArray(newNotesArray);

      const newPinnedNotesArray: Array<NoteItem> = pinned.filter(note => {
        return !!(note.tags?.find(tag => tag.includes(searchText.slice(1))))
      });
      setPinnedNotesArray(newPinnedNotesArray);
    } else {
      const newNotesArray: Array<NoteItem> = searchFn(searchText, notes);
      setNotesArray(newNotesArray);
      const newPinnedNotesArray: Array<NoteItem> = searchFn(searchText, pinned);
      setPinnedNotesArray(newPinnedNotesArray);
    }
  };

  const searchFn = (input: string, searchArray: Array<NoteItem>): Array<NoteItem> => {
    return searchArray.filter(note => {
      const matchBody: boolean = note.content.includes(input);
      const matchTitle: boolean = !!(note.title?.includes(input));
      const matchTags: boolean = !!(note.tags?.find(tag => tag.includes(input)));
      
      return matchBody || matchTitle || matchTags;
    });
  };

  // all tags modal
  const [ showModal, setShowModal ] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const toggleModal = (): void => {
    setShowModal(!showModal);

    if (!showModal) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
  };

  const triggerTagSearch = (tag: string): void => {
    if (searchRef.current) {
      searchRef.current.value = `#${tag}`;
      const inputEvt: InputEvent = new InputEvent("input", {
        bubbles: true,
      });

      searchRef.current.dispatchEvent(inputEvt);
      searchRef.current.focus();
    }
  };

  return (
    <section className="max-w-4xl mx-auto min-h-screen pb-20 px-8 sm:px-10 md:px-20 pt-16 md:pt-28">
      <div className="flex items-center md:items-end justify-between">
        <h1 className="flex font-bold font-bricolage md:my-[13.5px] text-2xl md:text-[2rem]">
          notebox 
          
          <span className="h-6 md:h-7 ml-2 w-6 md:w-7">
            <Notepad />
          </span>
        </h1>

        <BottomNav 
          triggerTagsModal={toggleModal}
        />
      </div>

      <div className="flex py-8 md:py-10">
        <SearchComponent 
          handleSearch={handleSearch}
          ref={searchRef}
        />

        <button
          className="border border-neutral-300 flex items-center ml-2.5 outline-none focus:outline-blue-300 p-1.5 rounded-md transition"
          onClick={() => notesView === 'list' ? updateView('grid') : updateView('list')}
          title={ notesView === 'grid' ? 'List View' : 'Grid View' }
          type="button"            
        >
          { notesView === 'grid'
            ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-8 lg:h-9 w-8 lg:w-9">
                <g stroke="#737373" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75}>
                  <path d="M3.5 20.5v-7h17v7h-17ZM3.5 10.5v-7h17v7h-17Z"/>
                </g>
              </svg>
            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-8 lg:h-9 w-8 lg:w-9">
                <g stroke="#737373" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75}>
                  <path d="M3.5 3.5h7v7h-7v-7ZM3.5 13.5h7v7h-7v-7ZM13.5 3.5h7v7h-7v-7ZM13.5 13.5h7v7h-7v-7Z"/>
                </g>
              </svg>
          }
        </button>
      </div>
      
      { !!(pinnedNotesArray.length) && 
          <div className="pb-10">
            <p className="flex font-medium items-center pb-4">📌 pinned notes</p>

            <NotesList notesArray={pinnedNotesArray} />
          </div>
      }

      <div className="pb-16">
        { !!(pinned.length && notesArray.length)  && 
            <p className="flex font-medium items-center pb-4">📁 other notes</p>
        }

        <NotesList notesArray={notesArray} />
      </div>

      { !(allNotes.length) &&
          <div className="md:flex md:justify-center">
            <p className="font-medium text-center text-neutral-500 text-lg">no notes in your notebox yet
              <span className="hidden md:inline">,</span>
            </p>
            <p className="font-medium text-center text-neutral-500 text-lg">
              <Link
                className="border-b border-transparent hover:border-[#ed4c5c] mx-1 text-[#ed4c5c] transition"
                to={'/new'}
              >
                click here
              </Link> to start writing ✍🏾
            </p>
          </div>
      }

      { !(notesArray.length) && !(pinnedNotesArray.length) && !!(allNotes.length) && 
          <p className="font-medium items-center py-16 text-center text-neutral-500 md:text-lg">no note found 😕</p>
      }

      { showModal &&
          <TagsMenu
            toggleModal={toggleModal}
            triggerTagSearch={triggerTagSearch}
          />
      }
    </section>
  )
};

export default HomePage;