import React from "react";
import styles from "../../../styles/misc/card.module.css";
import Image from "next/image";

const PendingFriendCard = ({ friend, handleAccept, handleDecline }) => {
  return (
    <div
      className={`flex flex-row items-center justify-between p-2 ${styles.card} rounded-xl`}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          src={friend.photo_url}
          width={50}
          height={50}
          alt="avatar"
          className="rounded-full"
        />
        <div className="text-xl">
          <span className="font-bold">{friend.name}</span>
          <span> added you as a friend!</span>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <button
          className="bg-green-500 hover:bg-green-700 text-white rounded-xl p-2"
          onClick={handleAccept}
        >
          Accept
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white rounded-xl p-2"
          onClick={handleDecline}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default PendingFriendCard;
