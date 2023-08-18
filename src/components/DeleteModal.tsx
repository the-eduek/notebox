import React from "react";

type ModalAction = 0 | 1;

interface DeleteModalProps {
  setModalAction: (action: ModalAction) => void
}

const DeleteModal: React.FC<DeleteModalProps> = ({ setModalAction }: DeleteModalProps) => {
  const handleClose = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    
    if (evt.target === evt.currentTarget){
      setModalAction(0)
    }
  };

  return (
    <section className="bg-neutral-700/80 backdrop-blur-sm fixed flex h-screen left-0 items-center justify-between p-10 top-0 w-screen" onClick={handleClose}>
      <div className="bg-neutral-50 flex flex-col h-1/3 md:h-1/2 items-center justify-center max-w-xl mx-auto p-6 rounded-lg w-full">
        <h1 className="font-medium py-10 text-lg">Confirm Delete? 👀</h1>

        <div className="flex items-center justify-between">
          <button
            className="bg-neutral-800 border border-neutral-300 font-medium mr-3 px-6 py-3 outline-none focus:outline-neutral-500 hover:outline-neutral-500 rounded-full text-neutral-50 transition"
            onClick={() => setModalAction(0)}
            title="Cancel Delete"
            type="button"
          >
            Cancel
          </button>

          <button
            className="border border-neutral-400 font-medium ml-3 px-6 py-3 outline-none focus:outline-neutral-400 hover:outline-neutral-400 rounded-full text-red-500 transition"
            onClick={() => setModalAction(1)}
            title="Delete Note"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>      
    </section>
  );
};

export default DeleteModal;