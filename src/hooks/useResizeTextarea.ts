import { useEffect } from "react";

function useResizeTextarea (
  textareaRef: HTMLTextAreaElement | null,
  value: string,
  initialHeight: number = 0
): void {
  useEffect(() => {
    if (textareaRef) {
      textareaRef.style.height = `0px`;

      const scrollHeight: number = textareaRef.scrollHeight;
      textareaRef.style.height = `${scrollHeight}px`;
    }
  }, [textareaRef, value, initialHeight]);
}

export default useResizeTextarea;