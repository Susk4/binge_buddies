import React from "react";
import styles from "../../../styles/misc/card.module.css";

import GroupUser from "./GroupUser";
import GroupRoleRow from "./GroupRoleRow";

const GroupCard = ({ group }) => {
  return (
    <div
      key={group.id}
      className={`flex flex-col gap-2 p-2 ${styles.card} rounded-xl`}
    >
      <h2 className="text-xl font-bold text-center">{group.name}</h2>

      <GroupRoleRow roleName="Owner">
        <GroupUser uid={group.creator} />
      </GroupRoleRow>
      <GroupRoleRow roleName="Users">
        {group.users.map((user) => (
          <GroupUser uid={user.id} key={user.id} />
        ))}
      </GroupRoleRow>
    </div>
  );
};

export default GroupCard;
