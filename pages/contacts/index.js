import { withProtected } from "../../src/hook/route";
import styles from "../../styles/misc/card.module.css";
import { useState } from "react";
import GroupList from "../../components/Contacts/groups/GroupList";
import FriendList from "../../components/Contacts/Friends/FriendList";
import FriendsDialog from "../../components/Contacts/Friends/FriendsDialog";
import GroupsDialog from "../../components/Contacts/groups/GroupsDialog";
import ContactsTabs from "../../components/Contacts/ContactsTabs";

function Groups({ auth }) {
  const { user } = auth;
  const [tab, setTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);

  return (
    <div
      className={` ${styles.card} flex-shrink basis-auto min-h-0 rounded-xl flex flex-col md:w-2/5  w-11/12 h-4/5 overflow-hidden`}
    >
      <ContactsTabs tab={tab} setTab={setTab} />

      <div className="p-2 flex-grow flex-shrink basis-0 min-h-0 overflow-auto">
        {tab === 0 ? (
          <GroupList user={user} refetch={refetch} setRefetch={setRefetch} />
        ) : (
          <FriendList user={user} refetch={refetch} setRefetch={setRefetch} />
        )}
      </div>

      {tab === 0 ? (
        <>
          <DialogButton
            text="Create Group"
            onClick={() => setIsOpen((prev) => !prev)}
          />
          {isOpen && (
            <GroupsDialog
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              user={user}
              setRefetch={setRefetch}
            />
          )}
        </>
      ) : (
        <>
          <DialogButton
            text="Add Friend"
            onClick={() => setIsOpen((prev) => !prev)}
          />
          {isOpen && (
            <FriendsDialog
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              user={user}
              setRefetch={setRefetch}
            />
          )}
        </>
      )}
    </div>
  );
}
export default withProtected(Groups);

const DialogButton = ({ text, onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white p-2 "
      onClick={onClick}
    >
      {text}
    </button>
  );
};
