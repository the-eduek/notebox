import React, { useState } from "react";

interface TagInputProps {
  canEdit?: boolean;
  tags: Array<string>;
  updateTags: (newNoteTags: Array<string>) => void;
}

const TagInput: React.FC<TagInputProps> = ({
  canEdit = true,
  tags,
  updateTags,
}: TagInputProps) => {
  const [tagInput, setTagInput] = useState<string>("");
  const keysToCreate: Array<string> = [",", "enter", " "];

  const createTag = (
    tagText: string,
    canCreate: boolean,
    tagHook?: () => Array<string> | undefined
  ): void => {
    let newTagsArray: Array<string> = tags;

    if (tagText.trim().startsWith("#")) tagText = tagText.slice(1);
    const validLength: boolean = tagText.trim().length > 1 && tagText.trim().length < 21;
    const tagExists: boolean = tags
      .filter((tag) => tag.toLowerCase())
      .includes(tagText.trim().toLowerCase());

    if (canCreate && validLength && !tagExists) {
      newTagsArray = [...tags.concat(tagText)];
      setTagInput("");
    }

    if (tagHook) newTagsArray = tagHook() ?? newTagsArray;
    updateTags(newTagsArray);
  };

  const deleteTag: React.MouseEventHandler<HTMLButtonElement> = (evt): void => {
    evt.preventDefault();

    if (!canEdit) return;

    const tag: string = evt.currentTarget.value;
    const newTagsArray: Array<string> = [...tags.filter((tagParam) => tagParam !== tag)];
    updateTags(newTagsArray);
  };

  const handleTagInput: React.FormEventHandler<HTMLInputElement> = (evt) => {
    evt.preventDefault();

    let currentText: string = evt.currentTarget.value;
    const currentKey: string = currentText.charAt(currentText.length - 1);
    const canCreate: boolean = keysToCreate.includes(currentKey.toLowerCase());

    if (currentKey === ",") currentText = currentText.slice(0, currentText.length - 1);

    setTagInput(currentText.trim());
    createTag(currentText, canCreate);
  };

  const handleTagKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (evt) => {
    const currentText: string = evt.currentTarget.value;
    const currentKey: string = evt.key.toLowerCase();
    const canCreate: boolean = keysToCreate.includes(currentKey.toLowerCase());

    createTag(currentText, canCreate, (): Array<string> | undefined => {
      if (currentKey === "backspace" && tags.length && !tagInput.length) {
        evt.preventDefault();
        const newTagsArray: Array<string> = [...tags];
        setTagInput(newTagsArray.pop()!);
        return newTagsArray;
      }
    });
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (evt) => {
    const currentText: string = evt.target.value;

    createTag(currentText, true);
    setTagInput("");
  };

  return (
    <ul className="flex flex-wrap items-center">
      {tags.map((tag: string, index: number) => (
        <li
          className="bg-neutral-200/50 inline-flex items-center mr-3 last:mr-0 my-1.5 px-2.5 py-1 rounded-full text-neutral-600/90 transition-all"
          key={index}
        >
          <span>#</span>
          <span className="font-medium">{tag}</span>
          {canEdit && (
            <button
              className="inline-flex h-4 items-center justify-center ml-1.5 rounded-full w-4"
              onClick={deleteTag}
              title="Delete Tag"
              type="button"
              value={tag}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="#636363"
                className="w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </li>
      ))}

      {tags && canEdit && (
        <li className="flex flex-1 min-w-[5.5rem]">
          <input
            className="bg-transparent h-full outline-none my-1 py-1 w-full"
            onBlur={handleBlur}
            onInput={handleTagInput}
            onKeyDown={handleTagKeyDown}
            placeholder="Tags"
            title="Note Tags"
            type="text"
            value={tagInput}
          />
        </li>
      )}
    </ul>
  );
};

export default TagInput;
