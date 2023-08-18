import React from "react";
import WritingHand from "./images/WritingHand";
import { Link } from "react-router-dom";
import Tag from "./images/Tag";

const MainButton: React.FC = () => {
  return (
    <section className="bg-[#ed4c5c] bottom-0 fixed  left-0 px-4 text-neutral-50 w-full">
      <div className="flex justify-between  mx-auto  max-w-2xl w-full">
        <Link
          className="flex font-medium items-center justify-center pb-8 px-6 pt-6 text-lg"
          title="New Note"
          to="/new"
        >
          <span className="h-7 w-7">
            <Tag />
          </span>
        </Link>

        <Link
          className="flex font-medium items-center justify-center pb-6 px-6 pt-4 text-lg"
          title="New Note"
          to="/new"
        >
          <span className="h-7 w-7">
            <WritingHand />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default MainButton;