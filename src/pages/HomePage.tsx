import React, { useContext, useRef, useState } from "react";
import { NoteItem } from "../types";
import { Link } from "react-router-dom";
import NoteContext from "../context/NoteContext";
import MenuOptions from "../components/MenuOptions";
import NotesList from "../components/NotesList";
import Notepad from "../components/images/Notepad";
import TagsMenu from "../components/TagsMenu";
import SearchComponent from "../components/SearchComponent";
import SwitchView from "../components/SwitchView";

const HomePage: React.FC = () => {
  const { allNotes, pinnedNotes } = useContext(NoteContext);


  // sorting
  const notes: Array<NoteItem> = allNotes
    .filter((note) => !pinnedNotes.includes(note.id))
    .sort((noteX, noteY) => noteY.id - noteX.id);

  const pinned: Array<NoteItem> = allNotes
    .filter((note) => pinnedNotes.includes(note.id))
    .sort((noteX, noteY) => noteY.id - noteX.id);

  const [notesArray, setNotesArray] = useState<Array<NoteItem>>(notes);
  const [pinnedNotesArray, setPinnedNotesArray] = useState<Array<NoteItem>>(pinned);

  // searching
  const searchRef = useRef<HTMLInputElement | null>(null);

  const searchFn = (input: string, searchArray: Array<NoteItem>): Array<NoteItem> => {
    return searchArray.filter((note) => {
      const matchBody: boolean = note.content.includes(input);
      const matchTitle: boolean = !!note.title?.includes(input);
      const matchTags: boolean = !!note.tags?.find((tag) => tag.includes(input));

      return matchBody || matchTitle || matchTags;
    });
  };

  const handleSearch = (searchText: string): void => {
    searchText = searchText.trim();

    if (searchText.startsWith("#")) {
      const newNotesArray: Array<NoteItem> = notes.filter((note) => {
        return !!note.tags?.filter((tag) => tag.includes(searchText.slice(1))).length;
      });
      setNotesArray(newNotesArray);

      const newPinnedNotesArray: Array<NoteItem> = pinned.filter((note) => {
        return !!note.tags?.find((tag) => tag.includes(searchText.slice(1)));
      });
      setPinnedNotesArray(newPinnedNotesArray);
    } else {
      const newNotesArray: Array<NoteItem> = searchFn(searchText, notes);
      setNotesArray(newNotesArray);
      const newPinnedNotesArray: Array<NoteItem> = searchFn(searchText, pinned);
      setPinnedNotesArray(newPinnedNotesArray);
    }
  };

  const searchByTag = (tag: string): void => {
    if (searchRef.current) {
      searchRef.current.value = `#${tag}`;
      const inputEvt: InputEvent = new InputEvent("input", {
        bubbles: true,
      });

      searchRef.current.dispatchEvent(inputEvt);
      searchRef.current.focus();
    }
  };

  // all tags modal
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = (): void => {
    setShowModal(!showModal);

    if (!showModal) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
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

        <MenuOptions triggerTagsModal={toggleModal} />
      </div>

      <div className="flex py-8 md:py-10">
        <SearchComponent
          handleSearch={handleSearch}
          ref={searchRef}
        />

        <SwitchView />
      </div>

      {!!pinnedNotesArray.length && (
        <NotesList
          notesArray={pinnedNotesArray}
          listTitle={"📌 pinned notes"}
        />
      )}

      <NotesList
        notesArray={notesArray}
        listTitle={"📁 other notes"}
        showListTitle={!!(pinned.length) && !!(notesArray.length)}
      />

      {!allNotes.length && (
        <div className="md:flex md:justify-center">
          <p className="font-medium text-center text-neutral-500 text-lg">
            no notes in your notebox yet
            <span className="hidden md:inline">,</span>
          </p>
          <p className="font-medium text-center text-neutral-500 text-lg">
            <Link
              className="border-b border-transparent hover:border-[#ed4c5c] mx-1 text-[#ed4c5c] transition"
              to={"/new"}
            >
              click here
            </Link>
            to start writing ✍🏾
          </p>
        </div>
      )}

      {!notesArray.length && !pinnedNotesArray.length && !!allNotes.length && (
        <p className="font-medium items-center py-16 text-center text-neutral-500 md:text-lg">
          no note found 😕
        </p>
      )}

      {showModal && (
        <TagsMenu
          toggleModal={toggleModal}
          triggerTagSearch={searchByTag}
        />
      )}
    </section>
  );
};

export default HomePage;
