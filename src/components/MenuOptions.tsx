import React from "react";
import { Link } from "react-router-dom";
import Tag from "./images/Tag";
import WritingHand from "./images/WritingHand";

interface MenuOptionsProps {
  triggerTagsModal(): void;
}

const MenuOptions: React.FC<MenuOptionsProps> = ({ triggerTagsModal }: MenuOptionsProps) => {
  return (
    <section className="bg-[#ed4c5c] md:bg-transparent bottom-0 fixed md:relative left-0 px-4 md:px-0 py-3 text-neutral-50 w-full">
      <div className="flex justify-between md:justify-end mx-auto max-w-2xl w-full">
        <button
          className="md:bg-[#ed4c5c] flex font-medium items-center justify-center mr-3 pb-6 min-[320px]:pl-3 md:px-8 pt-4 md:py-4 rounded-lg text-lg md:text-xl w-full md:w-auto"
          onClick={triggerTagsModal}
          title="All Tags"
        >
          <span className="mr-1.5 md:mr-2">all tags</span>
          <span className="h-7 md:h-6 w-7 md:w-6">
            <Tag />
          </span>
        </button>

        <Link
          className="md:bg-[#ed4c5c] flex font-medium items-center justify-center ml-3 pb-6 min-[320px]:pr-3 md:px-8 pt-5 md:py-4 rounded-lg text-lg md:text-xl w-full md:w-auto"
          title="New Note"
          to="/new"
        >
          <span className="mr-1.5 md:mr-2">new note</span>
          <span className="h-7 md:h-6 w-7 md:w-6">
            <WritingHand />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default MenuOptions;
