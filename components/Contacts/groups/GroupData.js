import React, { useState } from "react";
import GroupUser from "./GroupUser";
import GroupRoleRow from "./GroupRoleRow";
import { HiOutlineTrash } from "react-icons/hi";
import useAuth from "../../../src/hook/useAuth";
import useFireStore from "../../../src/hook/useFireStore";
import { IoLogOutOutline } from "react-icons/io5";
import BingeDialog from "../../misc/BingeDialog";

const GroupData = ({ group, groupDelete, groupLeave }) => {
  const { loading } = useFireStore();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [dialogData, setDialogData] = useState({
    title: "",
    description: "",
    callback: null,
  });

  return (
    <>
      <div className="flex flex-row justify-center items-center gap-2">
        <h2 className="text-xl font-bold text-center">{group.name}</h2>
        {user.uid === group.creator && (
          <div
            className="flex text-red-500 hover:text-red-700 cursor-pointer"
            onClick={() => {
              const data = {
                title: "Delete Group",
                description: "Are you sure you want to delete this group?",
                callback: () => groupDelete(group.id),
              };
              setDialogData(data);
              setIsOpen(true);
            }}
          >
            <HiOutlineTrash className="w-6 h-6" />
            Delete
          </div>
        )}
        {group.users.some((u) => u.id === user.uid && u.accepted) && (
          <div
            className="flex text-red-500 hover:text-red-700 cursor-pointer"
            onClick={() => {
              const data = {
                title: "Leave Group",
                description: "Are you sure you want to leave this group?",
                callback: () => groupLeave(group.id),
              };
              setDialogData(data);
              setIsOpen(true);
            }}
          >
            <IoLogOutOutline className="w-6 h-6" />
            Leave
          </div>
        )}
      </div>

      <GroupRoleRow roleName="Owner">
        <GroupUser uid={group.creator} />
      </GroupRoleRow>
      <GroupRoleRow roleName="Users">
        {group.users.map((user) => (
          <GroupUser uid={user.id} key={user.id} />
        ))}
      </GroupRoleRow>
      <BingeDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        callback={dialogData.callback}
        title={dialogData.title}
        loading={loading}
        error={error}
        description={dialogData.description}
      />
    </>
  );
};

export default GroupData;
