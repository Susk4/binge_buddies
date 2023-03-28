import React from "react";

const SearchBar = ({ query, setQuery, handleSearch }) => {
  return (
    <div className="flex justify-center md:justify-start gap-2">
      <input
        type="text"
        value={query}
        placeholder="Search"
        className="p-2 rounded-xl shadow-xl"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <button
        className="p-2 bg-red-600  hover:bg-red-700 rounded-xl text-lg text-white"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
