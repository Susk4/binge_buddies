import { Dialog } from "@headlessui/react";

const BingeDialog = ({
  isOpen,
  setIsOpen,
  callback,
  title,
  description,
  children,
}) => {
  const handleSubmit = () => {
    callback();
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 text-red-900"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded-xl  bg-gray-200">
          <div className="p-2">
            <Dialog.Title className="text-2xl font-semibold">
              {title}
            </Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
            {children}
          </div>

          <div
            className="flex flex-row w-full  overflow-hidden text-white"
            style={{
              borderRadius: "0 0 0.75rem 0.75rem",
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 bg-red-500 hover:bg-red-700  flex-grow"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSubmit()}
              className="p-2 bg-blue-500 hover:bg-blue-700  flex-grow"
            >
              {" "}
              Submit
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default BingeDialog;
