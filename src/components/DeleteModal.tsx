import React from "react";

interface DeleteModalProps {
  setDeleteAction: (action: boolean) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  setDeleteAction,
}: DeleteModalProps) => {
  const closeModal: React.MouseEventHandler<HTMLElement> = (evt) => {
    evt.preventDefault();
    if (evt.target === evt.currentTarget) setDeleteAction(false);
  };

  return (
    <section
      className="bg-neutral-700/80 backdrop-blur-sm fixed flex h-screen left-0 items-center justify-between p-10 top-0 w-screen"
      onClick={closeModal}
    >
      <div className="bg-neutral-50 flex flex-col min-h-[33.3%] items-center justify-center max-w-xl mx-auto px-6 py-10 rounded-lg shadow-[0,0,10pxrgba(0,0,0,0.5)] w-full">
        <h1 className="font-medium pb-6 md:pb-10 text-lg md:text-xl">
          Confirm Delete? 👀
        </h1>

        <div className="flex items-center justify-between">
          <button
            className="border border-neutral-400 font-medium mr-2 px-6 md:px-10 py-3 md:py-4 outline-none focus:outline-neutral-400 hover:outline-neutral-400 rounded-full text-red-500 transition"
            onClick={() => setDeleteAction(true)}
            title="Delete Note"
            type="button"
          >
            Delete
          </button>

          <button
            className="bg-neutral-800 border border-neutral-300 font-medium ml-2 px-6 md:px-10 py-3 md:py-4 outline-none focus:outline-neutral-500 hover:outline-neutral-500 rounded-full text-neutral-50 transition"
            onClick={() => setDeleteAction(false)}
            title="Cancel Delete"
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteModal;
