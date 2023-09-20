import { ViewType } from "../ViewContext";
import useViewContext from "./useViewContext";

export function useUpdateView() {
  const { setNotesView } = useViewContext();

  function updateView(newView: ViewType) {
    setNotesView(newView);
    localStorage.setItem("localView", newView);
  }

  return updateView;
}
