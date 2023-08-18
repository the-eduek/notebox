import { useState } from "react";
import { ViewContext } from "../context/ViewContext";
import { NoteItem, ViewType } from "../types";
import NotesList from "../components/NotesList";
import MainButton from "../components/MainButton";
import Notepad from "../components/images/Notepad";
import PushPin from "../components/images/PushPin";
import Folder from "../components/images/Folder";

function Home () {
  const [ noteView, setNoteView ] = useState<ViewType>("list");

  const changeView = (): void => {
    if (noteView === 'grid') setNoteView('list');
    else setNoteView('grid');
  };

  const today = new Date();
  const notesArray: Array<NoteItem> = [
    {
      content: "No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.",
      contentHtml: "<p>No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.</p><p>No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks.</p><p>Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.</p><p>Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.</p><p>Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.</p>",
      tags: ['lgbtqia', 'others'],
      createdAt: today,
      id: 1098767890
    },
    {
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, ab laborum officia tenetur provident earum nobis quisquam beatae nulla odit?",
      contentHtml: "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, ab laborum officia tenetur provident earum nobis quisquam beatae nulla odit?</p>",
      createdAt: today,
      id: 1098767890
    },
    {
      title: "Human rights, bitch.",
      content: "No one shall be subjected to arbitrary arrest, detention or exile.",
      contentHtml: "<p>No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.</p><p>No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks.</p><p>Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.</p><p>Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.</p><p>Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.</p>",
      tags: ['human rights', 'lgbtqia', 'others'],
      createdAt: today,
      id: 1098767890
    },
    {
      title: "Human rights, bitch.",
      content: "No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the  determination of his rights and obligations and of any criminal charge against him.",
      contentHtml: "<p>No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.</p><p>No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks.</p><p>Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.</p><p>Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.</p><p>Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.</p>",
      tags: ['human rights', 'lgbtqia', 'others', 'mahalia', 'november'],
      createdAt: today,
      id: 1098767890
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, cupiditate.",
      content: "No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.",
      contentHtml: "<p>No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.</p><p>No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks.</p><p>Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.</p><p>Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.</p><p>Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.</p>",
      tags: ['human rights', 'lgbtqia', 'others'],
      createdAt: today,
      id: 1098767890
    },
    {
      title: "Human rights, bitch.",
      content: "No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.",
      contentHtml: "<p>No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.</p><p>No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks.</p><p>Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.</p><p>Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.</p><p>Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.</p>",
      tags: ['human rights', 'lgbtqia', 'others'],
      createdAt: today,
      id: 1098767890
    },
    {
      title: "Human rights, bitch.",
      content: "No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.",
      contentHtml: "<p>No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.</p><p>No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks.</p><p>Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.</p><p>Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.</p><p>Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.</p>",
      tags: ['human rights', 'lgbtqia', 'others'],
      createdAt: today,
      id: 1098767890
    },
    {
      title: "Human rights, bitch.",
      content: "No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.",
      contentHtml: "<p>No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.</p><p>No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks.</p><p>Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.</p><p>Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.</p><p>Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.</p>",
      createdAt: today,
      id: 1098767890
    },
    {
      title: "Human rights, bitch.",
      content: "No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.",
      contentHtml: "<p>No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.</p><p>No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks.</p><p>Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.</p><p>Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.</p><p>Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.</p>",
      tags: ['human rights', 'lgbtqia', 'others'],
      createdAt: today,
      id: 1098767890
    },
    {
      title: "Human rights, bitch.",
      content: "No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.",
      contentHtml: "<p>No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.</p><p>No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks.</p><p>Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.</p><p>Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.</p><p>Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.</p>",
      tags: ['human rights', 'lgbtqia', 'others'],
      createdAt: today,
      id: 1098767890
    },
    {
      title: "Human rights, bitch.",
      content: "No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.",
      contentHtml: "<p>No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.</p><p>No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks.</p><p>Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.</p><p>Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.</p><p>Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.</p>",
      tags: ['human rights', 'lgbtqia', 'others'],
      createdAt: today,
      id: 1098767890
    },
    {
      title: "Human rights, bitch.",
      content: "No one shall be subjected to arbitrary arrest, detention or exile. Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.",
      tags: ['human rights', 'lgbtqia', 'others'],
      createdAt: today
    }
  ];

  return (
    <section className="min-h-screen pb-20 px-8 pt-16">
      <h1 className="flex font-bold font-bricolage text-2xl">
        notebox 
        
        <span className="h-6 ml-2 w-6">
          <Notepad />
        </span>
      </h1>

      <MainButton />

      <ViewContext.Provider value={noteView}>
        <div className="flex py-6">
          <div className="flex-grow relative">
            <input 
              className="bg-transparent border border-neutral-300 h-full outline-none focus:outline-blue-300 pl-10 pr-4 py-2.5 rounded-md w-full"
              type="search"
              id="searchInput"
              placeholder="search notes"
              title="Search Notes"
            />

            <label 
              htmlFor="searchInput"
              className="absolute left-3 top-[calc(50%-0.65rem)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </label>
          </div>

          <button
            className="border border-neutral-300 flex items-center ml-2 outline-none focus:outline-blue-300 p-2 rounded-md"
            onClick={changeView}
            title={ noteView === 'grid' ? 'List View' : 'Grid View' }
            type="button"            
          >
            { noteView === 'grid'
              ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-[1.375rem] w-[1.375rem]">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20.5h3.5v-7h-17v7H12m-6-17H3.5v7h17v-7H11"/>
                </svg>
              : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-[1.375rem] w-[1.375rem]">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13.5H3.5v7h7v-7H9M13.5 5V3.5h7v7h-7V9m-10-5.5h7v7h-7v-7Zm10 10h7v7h-7v-7Z"/>
                </svg>
            }
          </button>
        </div>

        <div className="pb-10">
          <p className="flex font-medium items-center pb-4">
            <span className="h-5 mr-1 w-5">
              <PushPin />
            </span> pinned notes
          </p>

          <NotesList notesArray={notesArray.slice(0, 4)} />
        </div>

        <div className="pb-16">
          <p className="flex font-medium items-center pb-4">
            <span className="h-5 mr-1 w-5">
              <Folder />
            </span> other notes
          </p>

          <NotesList notesArray={notesArray.slice(4)} />
        </div>
      </ViewContext.Provider>
    </section>
  )
}

export default Home;