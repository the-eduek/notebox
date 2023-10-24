import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <section className="flex flex-col max-w-4xl mx-auto min-h-screen pb-20 px-8 sm:px-10 md:px-20 pt-16 md:pt-28">
      <h1 className="flex font-bold font-bricolage md:my-[13.5px] text-2xl md:text-[2rem]">
        notebox
        <span className="h-6 md:h-7 ml-2 w-6 md:w-7">
          <svg className="h-full w-full">
            <use xlinkHref="/sprites.svg#notepad"></use>
          </svg>
        </span>
      </h1>

      <div className="md:flex md:justify-center py-32">
        <p className="font-medium pb-1 text-center text-neutral-500 text-xl md:text-[1.625rem]">
          oops, nothing found
          <span className="hidden md:inline">.</span>
        </p>
        <p className="font-medium text-center text-neutral-500 text-xl md:text-[1.625rem]">
          <Link
            className="border-b border-transparent hover:border-[#ed4c5c] mx-1 text-[#ed4c5c] transition"
            to="/"
          >
            see all your notes here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default NotFound;
