import React, { useContext, useState } from "react";
import NoteContext from "../context/NoteContext";

interface TagsModalProps {
  toggleModal: () => void,
  triggerTagSearch: (tag: string) => void
}

const TagsModal: React.FC<TagsModalProps> = ({ toggleModal, triggerTagSearch }: TagsModalProps) => {
  const {
    allTags
  } = useContext(NoteContext);

  // closing moadal
  const handleClose = (evt: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    if (evt.target === evt.currentTarget) toggleModal();
  };

  const handleClick = (tag: string): void => {
    triggerTagSearch(tag);
    toggleModal();
  };

  // searching tags
  const [ searchText, setSearchText ] = useState<string>("");
  const [ tagsArray, setTagsArray ] = useState<Array<string>>(allTags);

  const handleSearch = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput =  evt.target.value.trim();
    setSearchText(currentInput);

    const filteredTags = allTags.filter(tags => tags.includes(currentInput));
    setTagsArray(filteredTags);
  };

  return (
    <section className="fixed h-screen left-0 top-0 w-screen">
      <div 
        className="bg-neutral-800/20 flex h-full md:items-center md:justify-center"
        onClick={(evt: React.MouseEvent<HTMLElement, MouseEvent>) => handleClose(evt)}
      >
        <div className="overflow-y-scroll sm:w-3/5 md:h-4/5 md:rounded">
          <div className="bg-neutral-50 flex-col min-h-screen px-8 sm:px-12 py-16 sm:py-20 md:pt-32 md:rounded-lg">
            <div className="flex items-center justify-between pb-8 md:pb-14">
              <h1 className="flex font-bold font-bricolage text-2xl lg:text-3xl">all tags</h1>

              <button
                className="border border-neutral-300 h-8 p-1.5 rounded-full text-red-500 w-8"
                onClick={toggleModal}
                title="Close Tags"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-grow mb-5 relative">
              <input 
                className="bg-transparent border border-neutral-300 font-normal h-full outline-none focus:outline-blue-300 pl-10 pr-4 py-[15px] rounded-md text-lg transition w-full"
                type="search"
                id="searchInput"
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => handleSearch(evt)}
                placeholder="search tags"
                title="Search Notes"
                value={searchText}
              />

              <label 
                htmlFor="searchInput"
                className="absolute left-3 top-[calc(50%-0.75rem)] text-neutral-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </label>
            </div>
            
            <ul className="h-full items-center justify-center">
              { !(allTags.length) 
                ? <li className="font-medium items-center py-16 text-center md:text-lg">you haven't created any tags yet 👀</li>
                : tagsArray.map((tag, index) => (
                    <li 
                      className="mb-5 cursor"
                      key={index}
                    >
                      <button
                        className="border border-neutral-300/75 font-normal pl-6 pr-12 py-3 rounded-lg text-left text-lg w-full"
                        onClick={() => handleClick(tag)}
                        title={`${tag.charAt(0).toUpperCase()}${tag.slice(1)} Tag`}
                      >
                        <span className="font-medium text-neutral-500/80">#</span>
                        <span>{tag}</span>
                      </button>
                    </li>
                  ))
              }
              { !(tagsArray.length) &&
                  <li className="font-medium items-center py-16 text-center md:text-lg">no result found 😕</li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TagsModal;