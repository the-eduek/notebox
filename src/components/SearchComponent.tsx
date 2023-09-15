import React, { forwardRef, useState } from "react";

interface SearchComponentProps {
  handleSearch: (newText: string) => void;
  className?: string;
}

const SearchComponent = forwardRef<HTMLInputElement, SearchComponentProps>(
  (
    { handleSearch, className }: SearchComponentProps,
    searchRef: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [searchText, setSearchText] = useState<string>("");

    const updateSearchText: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
      const newText = evt.target.value;
      setSearchText(newText);
      handleSearch(newText);
    };

    return (
      <div className="flex-grow min-h-full relative">
        <input
          className={`bg-transparent border border-neutral-300 h-full outline-none focus:outline-blue-300 pl-10 pr-4 py-2.5 lg:py-[16px] rounded-md transition lg:text-lg w-full ${className}`}
          type="search"
          id="searchInput"
          onInput={updateSearchText}
          placeholder="search notes"
          ref={searchRef}
          title="Search Notes"
          value={searchText}
        />

        <label
          htmlFor="searchInput"
          className="absolute left-3 top-[calc(50%-0.65rem)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </label>
      </div>
    );
  }
);

export default SearchComponent;
