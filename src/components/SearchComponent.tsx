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

    const handleSearchInput: React.ChangeEventHandler<HTMLInputElement> = (
      evt
    ) => {
      setSearchText(() => evt.target.value);
      handleSearch(evt.target.value);
    };

    return (
      <div className="flex-grow min-h-full relative">
        <input
          className={`bg-transparent border border-neutral-300 h-full outline-none focus:outline-blue-300 pl-10 pr-4 py-2.5 lg:py-[16px] rounded-md transition lg:text-lg w-full ${className}`}
          type="search"
          id="searchInput"
          onInput={handleSearchInput}
          placeholder="search notes"
          ref={searchRef}
          title="Search Notes"
          value={searchText}
        />

        <label
          htmlFor="searchInput"
          className="absolute left-3 top-[calc(50%-0.65rem)]"
        >
          <svg className="h-5 w-5">
            <use xlinkHref="/sprites.svg#search"></use>
          </svg>
        </label>
      </div>
    );
  }
);

export default SearchComponent;
