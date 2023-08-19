import { useContext, useState } from "react";
import { NoteItem, ViewType } from "../types";
import ViewContext from "../context/ViewContext";
import NoteContext from "../context/NoteContext";
import MainButton from "../components/MainButton";
import NotesList from "../components/NotesList";
import Notepad from "../components/images/Notepad";
import TagsModal from "../components/TagsModal";

function Home () {
  const {
    allNotes,
    pinnedNotes
  } = useContext(NoteContext)

  // grid / list view
  const [ noteView, setNoteView ] = useState<ViewType>("list");

  const changeView = (): void => {
    if (noteView === 'grid') setNoteView('list');
    else setNoteView('grid');
  };

  // searching and sorting
  let sortedNotes: Array<NoteItem> = allNotes.filter(note => !pinnedNotes.some(pinnedNoteId => pinnedNoteId === note.id))
    .sort((noteA, noteB) => noteB.id - noteA.id);

  let sortedPinnedNotes: Array<NoteItem> = allNotes.filter(note => pinnedNotes.find(noteId => noteId === note.id))
    .sort((noteA, noteB) => noteB.id - noteA.id);

      
  const [ searchText, setSearchText ] = useState<string>("");


  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(evt.target.value);

    sortedNotes = sortedNotes.filter(note => {
      let sPlaceholder: string = searchText.trim();
      if (sPlaceholder.startsWith('#')) sPlaceholder = sPlaceholder.slice(1);

      console.log(sPlaceholder)
      return note.tags?.some(tag => tag.includes(sPlaceholder))
    });
  };

  // all tags modal
  const [ showModal, setShowModal ] = useState<boolean>(false);

  const toggleModal = (): void => {
    // setShowModal(!showModal);

    // if (!showModal) document.body.classList.add('overflow-hidden');
    // else document.body.classList.remove('overflow-hidden');
  };

  const setModalAction = (action: ModalAction): void => {
    console.log(action)
    if (action === 0) toggleModal();
    // else {
    //   deleteNote(noteObj);
    // }
  };

  // const setModalAction = (action: ModalAction): void => {
    
  // };





    // if (filterProp.value === 'all') {
    //   filteredCoins.value = coins.value.filter(coin => { 
    //     return coin.name.toLowerCase().includes(searchText.value.toLowerCase()) || coin.symbol.toLowerCase().includes(searchText.value.toLowerCase())
    //   });
    // } else if (filterProp.value === 'gainers') {
    //   filteredCoins.value = coins.value.filter(coin => coin.percentage > 0).filter(coin => { 
    //     return coin.name.toLowerCase().includes(searchText.value.toLowerCase()) || coin.symbol.toLowerCase().includes(searchText.value.toLowerCase())
    //   }).sort((firstCoin, secondCoin) => secondCoin.percentage - firstCoin.percentage);
    // } else if (filterProp.value === 'losers') {
    //   filteredCoins.value = coins.value.filter(coin => coin.percentage < 0).filter(coin => { 
    //     return coin.name.toLowerCase().includes(searchText.value.toLowerCase()) || coin.symbol.toLowerCase().includes(searchText.value.toLowerCase())
    //   }).sort((firstCoin, secondCoin) =>  firstCoin.percentage - secondCoin.percentage);
    // }

  return (
    <section className="max-w-4xl mx-auto min-h-screen pb-20 px-8 sm:px-10 md:px-20 pt-16 md:pt-28">
      <div className="flex items-center justify-between">
        <h1 className="flex font-bold font-bricolage text-2xl lg:text-3xl">
          notebox 
          
          <span className="h-6 md:h-7 ml-2 w-6 md:w-7">
            <Notepad />
          </span>
        </h1>

        <MainButton 
          triggerTagsModal={toggleModal}
        />
      </div>

      <ViewContext.Provider value={noteView}>
        <div className="flex py-6 md:py-8">
          <div className="flex-grow relative">
            <input 
              className="bg-transparent border border-neutral-300 h-full outline-none focus:outline-blue-300 pl-10 pr-4 py-2.5 rounded-md transition w-full"
              type="search"
              id="searchInput"
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => handleSearch(evt)}
              placeholder="search notes"
              title="Search Notes"
              value={searchText}
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
            className="border border-neutral-300 flex items-center ml-2 outline-none focus:outline-blue-300 p-2 rounded-md transition"
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

        
        { !!(sortedPinnedNotes.length) && 
            <div className="pb-10">
              <p className="flex font-medium items-center pb-4">📌 pinned notes</p>

              <NotesList notesArray={sortedPinnedNotes} />
            </div>
        }

        <div className="pb-16">
          { !!(sortedPinnedNotes.length) && 
              <p className="flex font-medium items-center pb-4">📁 other notes</p>
          }

          <NotesList notesArray={sortedNotes} />
        </div>
      </ViewContext.Provider>

      { !(allNotes.length) && 
          <p className="font-medium text-center text-neutral-500 text-lg">no notes in your notebox yet✍🏾</p>
      }

      { showModal &&
          <TagsModal
            setModalAction={setModalAction}
          />
      }
    </section>
  )
}

export default Home;