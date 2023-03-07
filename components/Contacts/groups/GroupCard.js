import React from "react";
import styles from "../../../styles/misc/card.module.css";
import Image from "next/image";

const GroupCard = ({ group }) => {
  return (
    <div
      key={group.id}
      className={`flex flex-col gap-2 p-2 ${styles.card} rounded-xl`}
    >
      <h2 className="text-xl font-bold text-center">{group.name}</h2>
      <div className="flex flex-row flex-wrap gap-2">
        {group.members.map((member) => (
          <div key={member.id} className={`flex flex-row gap-2 items-center`}>
            <Image
              src={`https://www.gravatar.com/avatar/${member.id}?s=50&d=identicon`}
              width={50}
              height={50}
              alt="avatar"
              className="rounded-full"
              unoptimized
            />

            <p>{member.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupCard;
