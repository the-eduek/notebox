import React, { useState } from 'react';

interface TagInputProps {
  canEdit?: boolean;
  tags: Array<string>;
  updateTags: (newNoteTags: Array<string>) => void
}

const TagInput: React.FC<TagInputProps> = ({ canEdit = true, tags, updateTags }: TagInputProps) => {
  const [ tagInput, setTagInput ] = useState<string>("");
  const keysToCreate: Array<string> = [ ",", "tab", "enter", " " ];

  const createTag = (tagText: string, canCreate: boolean, tagHook?: () => Array<string> | undefined): void => {
    let newTagsArray: Array<string> = tags;

    if (tagText.trim().startsWith('#')) tagText = tagText.slice(1);
    const validLength: boolean = tagText.trim().length > 1 && tagText.trim().length < 21; 

    if (canCreate && validLength && !(tags.includes(tagText.trim()))) {
      newTagsArray = [...tags.concat(tagText)];
      setTagInput("");
    }

    if (tagHook) newTagsArray = tagHook() ?? newTagsArray;
    updateTags(newTagsArray);
  };

  const deleteTag = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, tag: string): void => {
    evt.preventDefault();
    if (!canEdit) return;

    const newTagsArray: Array<string> = [...tags.filter(tagParam => tagParam !== tag)];
    updateTags(newTagsArray);
  };

  const handleTagInput = (evt: React.FormEvent<HTMLInputElement>): void => {
    evt.preventDefault();

    let currentText: string = evt.currentTarget.value;
    const currentKey: string = currentText.charAt(currentText.length - 1);
    const canCreate: boolean = keysToCreate.includes(currentKey.toLowerCase());

    if (currentKey === ",") currentText = currentText.slice(0, currentText.length - 1);

    setTagInput(currentText.trim());
    createTag(currentText, canCreate);
  };

  const handleTagKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>): void => {
    const currentText: string = evt.currentTarget.value;
    const currentKey: string = evt.key.toLowerCase();
    const canCreate: boolean = keysToCreate.includes(currentKey.toLowerCase());
   
    createTag (
      currentText, 
      canCreate, 
      (): Array<string> | undefined => {
        if (currentKey === "backspace" && tags.length && !(tagInput.length)) {
          evt.preventDefault();
          const newTagsArray: Array<string> = [...tags];
          setTagInput(newTagsArray.pop()!);
          return newTagsArray;
        }
      }
    );
  };

  return (
    <div>
      <ul className="flex flex-wrap items-center">
        { tags.map((tag: string, index: number) => (
            <li
              className="bg-neutral-200/60 font-medium inline-flex items-center mr-2 last:mr-0 my-1 px-2 py-1 rounded-full text-neutral-600" 
              key={index}
            >
              <span className="text-neutral-500/80">#</span>
              <span>{tag}</span>
              <button
                className={`${ !canEdit && 'hover:cursor-not-allowed'} bg-neutral-500/25 inline-flex h-5 items-center justify-center ml-2 p-[3px] rounded-full w-5`}
                onClick={(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => deleteTag(evt, tag)}
                title="Delete Tag"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#636363" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))
        }

        { tags && canEdit &&
            <li className="flex flex-1 min-w-[5.5rem]">
              <input 
                className="bg-transparent h-full outline-none my-1 py-1 w-full"
                onInput={handleTagInput}
                onKeyDown={handleTagKeyDown}
                placeholder="Enter a tag"
                title="Note Tags"
                type="text"
                value={tagInput}
              />                
            </li>
        }            
      </ul>
    </div>
  );
};

export default TagInput;