import React from "react";
import GroupCard from "./GroupCard";
import PendingGroupCard from "./PendingGroupCard";

const GroupList = ({ groups }) => {
  if (!groups) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex flex-col gap-2">
      {groups.map((group) => (
        <GroupCard group={group} key={group.id} />
      ))}
      {groups.map((group) => (
        <PendingGroupCard group={group} key={group.id + "_pending"} />
      ))}
    </div>
  );
};

export default GroupList;
