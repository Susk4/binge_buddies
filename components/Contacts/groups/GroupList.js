import React, { useState, useEffect, useCallback } from "react";
import GroupCard from "./GroupCard";
import PendingGroupCard from "./PendingGroupCard";
import useFireStore from "../../../src/hook/useFireStore";
import Loading from "../../misc/Loading";

const GroupList = ({ user, refetch, setRefetch }) => {
  const uid = user.uid;
  const {
    getAllPendingGroups,
    getGroups,
    acceptGroupRequest,
    declineGroupRequest,
    deleteGroup,
    leaveGroup,
    loading,
  } = useFireStore();
  const [groups, setGroups] = useState([]);
  const [pendingGroups, setPendingGroups] = useState([]);

  const fetchGroupList = () => {
    getGroups(uid).then((data) => {
      setGroups(data);
    });
    getAllPendingGroups(uid).then((data) => {
      setPendingGroups(data);
    });
  };

  useEffect(() => {
    if (refetch) {
      fetchGroupList();
      setRefetch(false);
    }
  }, [refetch]);

  useEffect(() => {
    fetchGroupList();
  }, []);

  const handleAccept = useCallback(
    async (groupId) => {
      await acceptGroupRequest(groupId, uid);
      fetchGroupList();
    },
    [acceptGroupRequest, fetchGroupList, uid]
  );

  const handleDecline = useCallback(
    async (groupId) => {
      await declineGroupRequest(groupId, uid);
      fetchGroupList();
    },
    [declineGroupRequest, fetchGroupList, uid]
  );

  const removeGroupFromState = (id) => {
    setGroups((prev) => prev.filter((group) => group.id !== id));
  };
  const removePendingGroupFromState = (id) => {
    setPendingGroups((prev) => prev.filter((group) => group.id !== id));
  };

  const handleGroupDelete = (id) => {
    deleteGroup(id, uid);
    removeGroupFromState(id);
    removePendingGroupFromState(id);
  };
  const handdleGroupLeave = (id) => {
    leaveGroup(id, uid);
    removeGroupFromState(id);
    removePendingGroupFromState(id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );
  }

  if (groups.length === 0 && pendingGroups.length === 0)
    return (
      <div className="flex items-center justify-center h-full">
        <h1 className="text-2xl font-bold text-center">No groups found</h1>
      </div>
    );

  return (
    <div className="flex flex-col gap-2">
      {groups.length !== 0 && (
        <>
          <h2 className="text-xl font-bold text-center">Groups</h2>
          {groups.map((group) => (
            <GroupCard
              group={group}
              key={group.id}
              refetch={fetchGroupList}
              groupDelete={handleGroupDelete}
              groupLeave={handdleGroupLeave}
            />
          ))}
        </>
      )}

      {pendingGroups.length !== 0 && (
        <>
          <h2 className="text-xl font-bold text-center">Pending Groups</h2>
          {pendingGroups.map((group) => (
            <PendingGroupCard
              group={group}
              user={user}
              key={group.id + "_pending"}
              accept={() => handleAccept(group.id)}
              decline={() => handleDecline(group.id)}
              refetch={fetchGroupList}
              groupDelete={handleGroupDelete}
              groupLeave={handdleGroupLeave}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default GroupList;
