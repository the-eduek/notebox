import React from "react";
import WritingHand from "./images/WritingHand";

const MainButton: React.FC = () => {
  const openNewNote = (): void => {
    console.log("hello")
  };

  return (
    <section className="bottom-0 fixed left-0 text-neutral-50 w-full">
      <button
        className="bg-[#ed4c5c] flex font-medium items-center justify-center pb-8 px-6 pt-6 text-lg w-full"  
        title="New Note" 
        type="button"
        onClick={openNewNote}
      > 
        new note

        <span className="h-6 ml-2 w-6">
          <WritingHand />
        </span>
      </button>
    </section>
  );

};

export default MainButton;