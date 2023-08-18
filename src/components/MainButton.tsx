import React from "react";
import WritingHand from "./images/WritingHand";
import { Link } from "react-router-dom";
import Tag from "./images/Tag";

const MainButton: React.FC = () => {
  return (
    <section className="bg-[#ed4c5c] md:bg-transparent bottom-0 fixed md:relative left-0 px-4 md:px-0 py-2 text-neutral-50 w-full">
      <div className="flex justify-between md:justify-end mx-auto max-w-2xl w-full">
        <Link
          className="md:bg-[#ed4c5c] flex font-medium items-center justify-center pb-6 px-6 md:px-4 pt-4 md:py-2 rounded-lg md:text-lg w-full md:w-auto"
          title="New Note"
          to="/new"
        >
          <span className="mr-1.5 md:mr-2">all tags</span>
          <span className="h-7 md:h-6 w-7 md:w-6">
            <Tag />
          </span>
        </Link>

        <Link
          className="md:bg-[#ed4c5c] flex font-medium items-center justify-center ml-4 pb-6 px-6 md:px-4 pt-4 md:py-2 rounded-lg md:text-lg w-full md:w-auto"
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

export default MainButton;