import React from "react";
import styles from "../../../styles/misc/card.module.css";
import GroupData from "./GroupData";
import Link from "next/link";

const GroupCard = ({ group, groupDelete, groupLeave }) => {
  return (
    <div
      key={group.id}
      className={`flex flex-col gap-2 p-2 ${styles.card} rounded-xl`}
    >
      <GroupData
        group={group}
        groupDelete={groupDelete}
        groupLeave={groupLeave}
      />
      <div className="flex justify-end">
        <Link href={`contacts/groups/${group.id}`} key={group.id} passHref>
          <span className="bg-green-500 hover:bg-green-700 text-white rounded-xl p-2 cursor-pointer">
            See Matches
          </span>
        </Link>
      </div>
    </div>
  );
};

export default GroupCard;
