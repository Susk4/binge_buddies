import React from "react";

const ContactsTabs = ({ setTab, tab }) => {
  return (
    <div className="flex flex-row ">
      <button
        className={`p-2 flex-grow  ${
          tab === 0 ? "bg-blue-500 text-white" : "bg-white text-black "
        }`}
        onClick={() => setTab(0)}
      >
        Groups
      </button>
      <button
        className={`p-2 flex-grow  ${
          tab === 1 ? "bg-blue-500 text-white" : "bg-white text-black"
        }`}
        onClick={() => setTab(1)}
      >
        Friends
      </button>
    </div>
  );
};

export default ContactsTabs;
