import React, { useContext } from "react";
import { ModalAction } from "../types";
import NoteContext from "../context/NoteContext";


interface TagsModalProps {
  setModalAction: (action: ModalAction) => void
}

const TagsModal: React.FC<TagsModalProps> = ({ setModalAction }: TagsModalProps) => {
  const {
    allTags
  } = useContext(NoteContext);

  return (
    <section className="fixed h-screen left-0 top-0 w-screen" onClick={() => setModalAction(0)}>
      <div className="flex h-full">
        <ul className="bg-neutral-50 h-full items-center justify-center p-6 w-a">
          { !(allTags.length) 
            ? <p>you haven't created any tags yet 👀</p>
            : allTags.map((tag, index) => (
                <li 
                  className=""
                  key={index}
                >
                  {tag}
                </li>
              ))
          }
        </ul>
      </div>
    </section>
  );
};

export default TagsModal;