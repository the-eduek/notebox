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
  const keysToCreate: readonly string[] = [" ", ",", "enter"];

  const createTag = (tagText: string, canCreate: boolean): void => {
    if (canCreate) {
      if (tagText.trim().startsWith("#")) tagText = tagText.slice(1);

      let newTagsArray = tags;
      const validLength =
        tagText.trim().length > 1 && tagText.trim().length < 21;
      const tagExists = tags
        .filter((tag) => tag.toLowerCase())
        .includes(tagText.trim().toLowerCase());

      if (validLength && !tagExists) newTagsArray = [...tags, tagText];

      updateTags(newTagsArray);
      setTagInput(() => "");
    }
  };

  const deleteTag: React.MouseEventHandler<HTMLButtonElement> = (evt): void => {
    evt.preventDefault();
    if (canEdit) {
      const tag = evt.currentTarget.value;
      const newTagsArray = [...tags.filter((tagParam) => tagParam !== tag)];
      updateTags(newTagsArray);
    }
  };

  const handleTagInput: React.FormEventHandler<HTMLInputElement> = (evt) => {
    evt.preventDefault();
    let currentText = evt.currentTarget.value;
    const currentKey = currentText.charAt(currentText.length - 1).toLowerCase();
    const canCreate = keysToCreate.includes(currentKey);

    if (currentKey === ",")
      currentText = currentText.slice(0, currentText.length - 1);
    setTagInput(() => currentText.trim());
    createTag(currentText, canCreate);
  };

  const handleTagKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    evt
  ) => {
    if (evt.key.toLowerCase() === "enter") evt.preventDefault();

    const currentKey = evt.key.toLowerCase();
    const canCreate = keysToCreate.includes(currentKey);

    if (currentKey === "backspace" && !!tags.length && !tagInput.length) {
      setTagInput(() => `${tags[tags.length - 1]} `);
      updateTags(tags.slice(0, tags.length - 1));
    } else createTag(evt.currentTarget.value, canCreate);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (evt) => {
    createTag(evt.target.value, true);
    setTagInput(() => "");
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
              <svg className="w-full h-full">
                <use xlinkHref="/sprites.svg#x"></use>
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
