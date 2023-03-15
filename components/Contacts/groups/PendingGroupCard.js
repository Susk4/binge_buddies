import styles from "../../../styles/misc/card.module.css";
import GroupUser from "./GroupUser";
import GroupRoleRow from "./GroupRoleRow";

const PendingGroupCard = ({ user, group, accept, decline }) => {
  const handleAccept = () => {
    accept();
  };

  const handleReject = () => {
    decline();
  };

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
      {group.users.some((u) => u.id === user.uid && !u.accepted) && (
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
      )}
    </div>
  );
};

export default PendingGroupCard;
