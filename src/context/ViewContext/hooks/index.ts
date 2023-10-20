import { useContext } from "react";
import { ViewContext, ViewType } from "../ViewContext";

export default function useViewContext() {
  const context = useContext(ViewContext);

  if (!context) {
    throw new Error("useViewContext must be used within ViewContextProvider.");
  }

  return context;
}

export function useUpdateView() {
  const { setNotesView } = useViewContext();

  function updateView(newView: ViewType) {
    setNotesView(newView);
    localStorage.setItem("localView", newView);
  }

  return updateView;
}
