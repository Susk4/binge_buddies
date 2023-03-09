import React, { useState, useEffect } from "react";
import GroupCard from "./GroupCard";
import PendingGroupCard from "./PendingGroupCard";
import useFireStore from "../../../src/hook/useFireStore";

const GroupList = ({ user }) => {
  const uid = user.uid;
  const { getPendingGroups, getSentGroupRequests, loading } = useFireStore();
  const [pendingGroups, setPendingGroups] = useState([]);
  const [sentGroupRequests, setSentGroupRequests] = useState([]);
  const [fetch, setFetch] = useState(true);

  useEffect(() => {
    if (fetch) {
      getPendingGroups(uid).then((data) => {
        setPendingGroups(data);
      });
      getSentGroupRequests(uid).then((data) => {
        setSentGroupRequests(data);
      });

      setFetch(false);
    }
  }, [fetch]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex flex-col gap-2">
      {/* {groups.map((group) => (
        <GroupCard group={group} key={group.id} />
      ))}
       */}
      {pendingGroups.length !== 0 && (
        <>
          <h2 className="text-xl font-bold text-center">Pending Groups</h2>
          {pendingGroups.map((group) => (
            <PendingGroupCard group={group} key={group.id + "_pending"} />
          ))}
        </>
      )}
      {sentGroupRequests.length !== 0 && (
        <>
          <h2 className="text-xl font-bold text-center">Sent Group Requests</h2>
          {sentGroupRequests.map((group) => (
            <GroupCard group={group} key={group.id + "_sent"} />
          ))}
        </>
      )}
    </div>
  );
};

export default GroupList;
