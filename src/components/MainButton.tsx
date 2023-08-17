import React from "react";
import WritingHand from "./images/WritingHand";
import { Link } from "react-router-dom";

const MainButton: React.FC = () => {
  return (
    <section className="bottom-0 fixed left-0 text-neutral-50 w-full">
      <Link
        className="bg-[#ed4c5c] flex font-medium items-center justify-center pb-8 px-6 pt-6 text-lg w-full"
        title="New Note"
        to="/new"
      >
        new note

        <span className="h-6 ml-2 w-6">
          <WritingHand />
        </span>
      </Link>
    </section>
  );
};

export default MainButton;