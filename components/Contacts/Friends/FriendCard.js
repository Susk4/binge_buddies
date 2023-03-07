import React from "react";
import styles from "../../../styles/misc/card.module.css";
import Image from "next/image";

const GroupCard = ({ friend }) => {
  return (
    <div
      className={`flex flex-row items-center gap-2 p-2 ${styles.card} rounded-xl`}
    >
      <Image
        src={friend.photo_url}
        width={50}
        height={50}
        alt="avatar"
        className="rounded-full"
        unoptimized
      />
      <h2 className="text-xl font-bold">{friend.name}</h2>
    </div>
  );
};

export default GroupCard;
