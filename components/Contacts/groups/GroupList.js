import React, { useState, useEffect, useCallback } from "react";
import GroupCard from "./GroupCard";
import PendingGroupCard from "./PendingGroupCard";
import useFireStore from "../../../src/hook/useFireStore";
import Link from "next/link";
import Loading from "../../misc/Loading";

const GroupList = ({ user }) => {
  const uid = user.uid;
  const {
    getAllPendingGroups,
    getGroups,
    acceptGroupRequest,
    declineGroupRequest,
    loading,
  } = useFireStore();
  const [groups, setGroups] = useState([]);
  const [pendingGroups, setPendingGroups] = useState([]);

  const fetchGroupList = useCallback(() => {
    getGroups(uid).then((data) => {
      setGroups(data);
    });
    getAllPendingGroups(uid).then((data) => {
      setPendingGroups(data);
    });
  }, [getAllPendingGroups, getGroups, uid]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {groups.length !== 0 && (
        <>
          <h2 className="text-xl font-bold text-center">Groups</h2>
          {groups.map((group) => (
            <Link
              href={`contacts/groups/${group.id}`}
              key={group.id}
              legacyBehavior
            >
              <a>
                <GroupCard group={group} key={group.id} />
              </a>
            </Link>
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
            />
          ))}
        </>
      )}
    </div>
  );
};

export default GroupList;
