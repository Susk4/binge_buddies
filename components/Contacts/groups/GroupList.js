import React from "react";
import GroupCard from "./GroupCard";

const GroupList = ({ groups }) => {
  if (!groups) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex flex-col gap-2">
      {groups.map((group) => (
        <GroupCard group={group} key={group.id} />
      ))}
    </div>
  );
};

export default GroupList;
