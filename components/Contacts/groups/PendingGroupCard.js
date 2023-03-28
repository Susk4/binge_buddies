import styles from "../../../styles/misc/card.module.css";
import GroupData from "./GroupData";

const PendingGroupCard = ({ user, group, accept, decline, refetch }) => {
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
      <GroupData group={group} refetch={refetch} />
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
