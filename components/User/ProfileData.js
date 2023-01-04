import Image from "next/image";
/* import UserStats from "./UserStats"; */

const ProfileData = ({ user }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-center">
        <Image
          src={user.photoURL}
          width="100"
          height="100"
          alt="user photo"
          className="rounded-full"
        />
      </div>
      <div>
        <h1 className="text-3xl text-center">{user.displayName}</h1>
      </div>
      <div>
      </div>
      {/* <UserStats user={user}/> */}
    </div>
  );
};
export default ProfileData;
