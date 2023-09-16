import React from "react";
import { Link } from "react-router-dom";

const EmptyNotes: React.FC = () => {
  return (
    <div className="md:flex md:justify-center">
      <p className="font-medium text-center text-neutral-500 text-lg">
        no notes in your notebox yet
        <span className="hidden md:inline">,</span>
      </p>
      <p className="font-medium text-center text-neutral-500 text-lg">
        <Link
          className="border-b border-transparent hover:border-[#ed4c5c] mx-1 text-[#ed4c5c] transition"
          to={"/new"}
        >
          click here
        </Link>
        to start writing ✍🏾
      </p>
    </div>
  );
};

export default EmptyNotes;
