import React from "react";
import styles from "../../../styles/misc/card.module.css";
import Image from "next/image";

const GroupCard = ({ friend }) => {
  return (
    <div
      key={friend.id}
      className={`flex flex-row items-center gap-2 p-2 ${styles.card} rounded-xl`}
    >
      <Image
        src={`https://www.gravatar.com/avatar/${friend.id}?s=50&d=identicon`}
        width={50}
        height={50}
        alt="avatar"
        className="rounded-full"
      />
      <h2 className="text-xl font-bold">{friend.name}</h2>
    </div>
  );
};

export default GroupCard;
