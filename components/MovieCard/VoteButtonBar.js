import React from "react";
import VoteButton from "./VoteButton";

const VoteButtonBar = ({ like, dislike }) => {
  return (
    <div className="flex flex-row justify-between pt-2 w-full">
      <VoteButton
        className="bg-red-600 p-2 text-black font-bold rounded-xl w-1/4"
        text={"Dislike"}
        onTap={dislike}
      />
      <VoteButton
        className="bg-green-600 p-2 text-black font-bold rounded-xl w-1/4"
        text={"Like"}
        onTap={like}
      />
    </div>
  );
};

export default VoteButtonBar;
