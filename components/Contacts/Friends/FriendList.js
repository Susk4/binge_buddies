import React, { useState, useEffect, useMemo } from "react";
import FriendCard from "./FriendCard";
import PendingFriendCard from "./PendingFriendCard";
import useFireStore from "../../../src/hook/useFireStore";
import FriendListGroup from "./FriendListGroup";
import Loading from "../../misc/Loading";

const FriendList = ({ user }) => {
  const uid = useMemo(() => user.uid, [user]);
  const {
    getContacts,
    getContactRequests,
    getContactRequestsSent,
    acceptContactRequest,
    declineContactRequest,
    loading,
  } = useFireStore();
  const [contactRequests, setContactRequests] = useState([]);
  const [contactRequestsSent, setContactRequestsSent] = useState([]);
  const [friends, setFriends] = useState([]);

  const fetchFriendsList = () => {
    getContactRequests(uid).then((data) => {
      setContactRequests(data);
    });
    getContactRequestsSent(uid).then((data) => {
      setContactRequestsSent(data);
    });

    getContacts(uid).then((data) => {
      setFriends(data);
    });
  };

  useEffect(() => {
    fetchFriendsList();
  }, []);

  const handleAccept = async (contact) => {
    await acceptContactRequest(contact);
    fetchFriendsList();
  };

  const handleDecline = async (contact) => {
    await declineContactRequest(contact);
    fetchFriendsList();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {friends.length !== 0 && (
        <FriendListGroup title="Friends">
          <>
            {friends.map((friend) => (
              <FriendCard friend={friend} key={friend.email} />
            ))}
          </>
        </FriendListGroup>
      )}
      {contactRequests.length !== 0 && (
        <FriendListGroup title="Friend Requests">
          <>
            {contactRequests.map((contact) => (
              <PendingFriendCard
                friend={contact}
                handleAccept={() => handleAccept(contact.contact_doc_id)}
                handleDecline={() => handleDecline(contact.contact_doc_id)}
                key={contact.email + "_pending"}
              />
            ))}
          </>
        </FriendListGroup>
      )}
      {contactRequestsSent.length !== 0 && (
        <FriendListGroup title="Friend Requests Sent">
          <>
            {contactRequestsSent.map((contact) => (
              <FriendCard friend={contact} key={contact.email + "_sent"} />
            ))}
          </>
        </FriendListGroup>
      )}
    </div>
  );
};

export default FriendList;
