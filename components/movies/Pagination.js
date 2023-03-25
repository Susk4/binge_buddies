import React from "react";

const Pagination = ({ setPage, page, pages }) => {
  return (
    <div className="flex gap-2 justify-center text-white">
      <PaginationButton
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        text="Previous"
      />
      <PaginationButton
        disabled={page === pages}
        onClick={() => setPage(page + 1)}
        text="Next"
      />
    </div>
  );
};

export default Pagination;

const PaginationButton = ({ disabled, onClick, text }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`p-2 ${
        disabled ? "opacity-50" : "hover:bg-blue-700"
      } bg-blue-600 rounded-xl text-lg w-24 focus:outline-none `}
    >
      {text}
    </button>
  );
};
