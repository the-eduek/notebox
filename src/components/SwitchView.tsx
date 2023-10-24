import React from "react";
import useViewContext, { useUpdateView } from "../context/ViewContext/hooks";

const SwitchView: React.FC = () => {
  const { notesView } = useViewContext();
  const updateView = useUpdateView();

  return (
    <button
      className="border border-neutral-300 flex items-center ml-2.5 md:ml-3 outline-none focus:outline-blue-300 p-1 md:p-1.5 rounded-md transition"
      onClick={() =>
        notesView === "list" ? updateView("grid") : updateView("list")
      }
      title={notesView === "list" ? "Grid View" : "List View"}
      type="button"
    >
      {notesView === "grid" ? (
        <svg className="h-9 lg:h-10 w-9 lg:w-11">
          <use xlinkHref="/sprites.svg#grid"></use>
        </svg>
      ) : (
        <svg
          className="h-9 lg:h-10 w-9 lg:w-11"
        >
        <use xlinkHref="/sprites.svg#list"></use>
          
        </svg>
      )}
    </button>
  );
};

export default SwitchView;
