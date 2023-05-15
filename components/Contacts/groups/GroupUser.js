import React from "react";
import Image from "next/image";
import Loading from "../../misc/Loading";

import useFireStore from "../../../src/hook/useFireStore";
import useAuth from "../../../src/hook/useAuth";
import { useState, useEffect } from "react";

const GroupUser = ({ uid }) => {
  const { user: currentUser } = useAuth();
  const { getUser } = useFireStore();

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (currentUser.uid === uid) {
      setUser({
        name: currentUser.displayName,
        photo_url: currentUser.photoURL,
      });
    } else {
      getUser(uid).then((data) => {
        setUser(data);
      });
    }
  }, []);

  if (!user || !user.name || !user.photo_url)
    return (
      <div>
        <Loading size={30} />
      </div>
    );
  return (
    <div className={`flex flex-row gap-2 items-center`}>
      <Image
        //user photo or random avatar from gravatar
        src={user.photo_url}
        width={50}
        height={50}
        alt="avatar"
        className="rounded-full"
        referrerPolicy="no-referrer"
        unoptimized
      />
      <p>{user.name}</p>
    </div>
  );
};

export default GroupUser;
