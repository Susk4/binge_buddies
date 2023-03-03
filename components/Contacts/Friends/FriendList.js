import React from "react";
import FriendCard from "./FriendCard";

const FriendList = ({ friends }) => {
  if (!friends) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex flex-col gap-2">
      {friends.map((friend) => (
        <FriendCard friend={friend} key={friend.id} />
      ))}
    </div>
  );
};

export default FriendList;
