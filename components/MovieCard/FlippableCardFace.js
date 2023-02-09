import React from "react";
import { HiSwitchHorizontal } from "react-icons/hi";

const FlippableCardFace = ({ styles, children, onClick, backgroundURL }) => {
  return (
    <div
      className={`${styles} rounded-xl`}
      style={{
        background: backgroundURL
          ? `url(https://image.tmdb.org/t/p/original${backgroundURL})`
          : "red",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
      <button
        onClick={onClick}
        className="absolute right-4 top-4 p-2 rounded-full text-white"
        style={{ backgroundColor: " rgba(0,0,0,0.5)" }}
      >
        <HiSwitchHorizontal className="w-8 h-8" />
      </button>
    </div>
  );
};

export default FlippableCardFace;
