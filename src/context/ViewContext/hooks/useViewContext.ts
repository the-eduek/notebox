import { useContext } from "react";
import ViewContext from "../ViewContext";

export default function useViewContext() {
  const context = useContext(ViewContext);

  if (!context) {
    throw new Error("useViewContext must be used within ViewContextProvider.");
  }

  return context;
}
