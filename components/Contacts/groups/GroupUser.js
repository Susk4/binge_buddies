import React from "react";
import Image from "next/image";

const GroupUser = ({ user }) => {
  return (
    <div className={`flex flex-row gap-2 items-center`}>
      <Image
        src={user.photo_url || "/images/avatar.png"}
        width={50}
        height={50}
        alt="avatar"
        className="rounded-full"
        unoptimized
      />
      <p>{user.name}</p>
    </div>
  );
};

export default GroupUser;
