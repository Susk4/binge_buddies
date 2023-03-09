import { withProtected } from "../../src/hook/route";
import styles from "../../styles/misc/card.module.css";
import { useState } from "react";
import GroupList from "../../components/Contacts/groups/GroupList";
import FriendList from "../../components/Contacts/Friends/FriendList";
import FriendsDialog from "../../components/Contacts/Friends/FriendsDialog";
import GroupsDialog from "../../components/Contacts/groups/GroupsDialog";

const users = [
  {
    id: 1,
    name: "Peter Sagan",
  },

  {
    id: 2,
    name: "Chris Froome",
  },
  {
    id: 3,
    name: "Geraint Thomas",
  },
  {
    id: 4,
    name: "Egan Bernal",
  },
  {
    id: 5,
    name: "Remco Evenepoel",
  },
  {
    id: 6,
    name: "Tadej Pogacar",
  },
  {
    id: 7,
    name: "Vincenzo Nibali",
  },
  {
    id: 8,
    name: "Mikel Landa",
  },
];
const groups = [
  {
    id: 1,
    name: "Group 1",
    members: [users[0], users[1]],
  },
  {
    id: 2,
    name: "Group 2",
    members: [users[0], users[1]],
  },
  {
    id: 3,
    name: "Group 3",
    members: [users[0], users[1]],
  },
  {
    id: 4,
    name: "Group 4",
    members: [
      users[0],
      users[1],
      users[2],
      users[3],
      users[4],
      users[5],
      users[6],
      users[7],
    ],
  },
  {
    id: 5,
    name: "Group 5",
    members: [users[0], users[3]],
  },
  {
    id: 6,
    name: "Group 6",
    members: [users[2], users[6]],
  },
  {
    id: 7,
    name: "Group 7",
    members: [users[7], users[3]],
  },
];

function Groups({ auth }) {
  const { user } = auth;
  const [tab, setTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={` ${styles.card} flex-shrink basis-auto min-h-0 rounded-xl flex flex-col md:w-2/5  w-11/12 h-4/5 overflow-hidden`}
    >
      <div className="flex flex-row ">
        <button
          className={`p-2 flex-grow  ${
            tab === 0 ? "bg-blue-500 text-white" : "bg-white text-black "
          }`}
          onClick={() => setTab(0)}
        >
          Groups
        </button>
        <button
          className={`p-2 flex-grow  ${
            tab === 1 ? "bg-blue-500 text-white" : "bg-white text-black"
          }`}
          onClick={() => setTab(1)}
        >
          Friends
        </button>
      </div>

      <div className="p-2 flex-grow flex-shrink basis-0 min-h-0 overflow-auto">
        {tab === 0 ? <GroupList user={user} /> : <FriendList user={user} />}
      </div>

      {tab === 0 ? (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white p-2 "
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Create Group
          </button>
          {isOpen && (
            <GroupsDialog isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
          )}
        </>
      ) : (
        <>
          <button
            className="bg-blue-500  hover:bg-blue-700 text-white p-2 "
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Add Friend
          </button>
          {isOpen && (
            <FriendsDialog isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
          )}
        </>
      )}
    </div>
  );
}
export default withProtected(Groups);
