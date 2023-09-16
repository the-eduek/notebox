import React, { useContext } from "react";
import ViewContext from "../context/ViewContext";

const SwitchView: React.FC = () => {
  const { notesView, updateView } = useContext(ViewContext);

  return (
    <button
      className="border border-neutral-300 flex items-center ml-2.5 md:ml-3 outline-none focus:outline-blue-300 p-1 md:p-1.5 rounded-md transition"
      onClick={() => (notesView === "list" ? updateView("grid") : updateView("list"))}
      title={notesView === "list" ? "Grid View" : "List View"}
      type="button"
    >
      {notesView === "grid" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-9 lg:h-10 w-9 lg:w-11"
        >
          <g
            stroke="#737373"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.575}
          >
            <path d="M3.5 20.5v-7h17v7h-17ZM3.5 10.5v-7h17v7h-17Z" />
          </g>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-9 lg:h-10 w-9 lg:w-11"
        >
          <g
            stroke="#737373"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.575}
          >
            <path d="M3.5 3.5h7v7h-7v-7ZM3.5 13.5h7v7h-7v-7ZM13.5 3.5h7v7h-7v-7ZM13.5 13.5h7v7h-7v-7Z" />
          </g>
        </svg>
      )}
    </button>
  );
};

export default SwitchView;
