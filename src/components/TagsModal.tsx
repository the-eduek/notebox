import React, { useContext, useState } from "react";
import NoteContext from "../context/NoteContext";
import SearchComponent from "./SearchComponent";

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
  const [ tagsArray, setTagsArray ] = useState<Array<string>>(allTags);

  const handleSearch = (searchText: string) => {
    searchText =  searchText.trim();

    const filteredTags = allTags.filter(tags => tags.includes(searchText));
    setTagsArray(filteredTags);
  };

  return (
    <section className="fixed h-screen left-0 top-0 w-screen">
      <div 
        className="bg-neutral-800/20 flex h-full md:items-center md:justify-center"
        onClick={handleClose}
      >
        <div className="overflow-y-scroll sm:w-3/5 md:h-4/5 md:rounded">
          <div className="bg-neutral-50 flex-col min-h-full px-8 sm:px-12 py-16 sm:py-20 md:pt-32 md:rounded-lg">
            <div className="flex items-center justify-between pb-8 md:pb-14">
              <h1 className="flex font-bold font-bricolage text-2xl md:text-[2rem]">all tags</h1>

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

            <SearchComponent 
              handleSearch={handleSearch}
              className="font-normal py-[15px]"
            />
            
            <ul className="h-full items-center justify-center mt-5">
              { !(allTags.length) 
                ? <li className="font-medium items-center py-16 text-center text-neutral-500 md:text-lg">you haven't created any tags yet 👀</li>
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
              { !(tagsArray.length) && !!(allTags.length) &&
                  <li className="font-medium items-center py-16 text-center text-neutral-500 md:text-lg">no tag found 😕</li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TagsModal;