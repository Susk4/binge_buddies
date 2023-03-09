import React, { useState, useEffect } from "react";
import styles from "../../../styles/misc/card.module.css";
import useFireStore from "../../../src/hook/useFireStore";
import GroupUser from "./GroupUser";
import GroupRoleRow from "./GroupRoleRow";

const PendingGroupCard = ({ group }) => {
  const { getUser, getUsers, loading } = useFireStore();
  const [users, setUsers] = useState([]);
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    getUsers(group.users.map((user) => user.id)).then((data) => {
      setUsers(data);
    });
    getUser(group.creator).then((data) => {
      setCreator(data);
    });
  }, []);

  const handleAccept = () => {
    console.log("Accept");
  };

  const handleReject = () => {
    console.log("Reject");
  };
  return (
    <div
      key={group.id}
      className={`flex flex-col gap-2 p-2 ${styles.card} rounded-xl`}
    >
      <h2 className="text-xl font-bold text-center">{group.name}</h2>

      {creator && creator.photo_url && (
        <GroupRoleRow roleName="Owner">
          <GroupUser user={creator} />
        </GroupRoleRow>
      )}
      <GroupRoleRow roleName="Users">
        {loading ? (
          <>Loading...</>
        ) : (
          <>
            {users.map((user) => (
              <GroupUser user={user} key={user.email + "_pending"} />
            ))}
          </>
        )}
      </GroupRoleRow>
      <div className="flex justify-center gap-2">
        <button
          className="bg-green-500 hover:bg-green-700 text-white rounded-xl p-2"
          onClick={handleAccept}
        >
          Accept
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white rounded-xl p-2"
          onClick={handleReject}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default PendingGroupCard;
