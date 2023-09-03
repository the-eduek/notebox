import React, { useContext } from "react";
import ViewContext from "../context/ViewContext";

const SwitchView: React.FC = () => {
  // grid / list view
  const { notesView, updateView } = useContext(ViewContext);

  return (
    <button
      className="border border-neutral-300 flex items-center ml-2.5 outline-none focus:outline-blue-300 p-1.5 rounded-md transition"
      onClick={() => (notesView === "list" ? updateView("grid") : updateView("list"))}
      title={notesView === "grid" ? "List View" : "Grid View"}
      type="button"
    >
      {notesView === "grid" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-8 lg:h-9 w-8 lg:w-9"
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
          className="h-8 lg:h-9 w-8 lg:w-9"
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
