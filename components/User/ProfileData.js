import Image from "next/image";
import UserImage from "../../src/layout/components/UserImage";
/* import UserStats from "./UserStats"; */

const ProfileData = ({ user }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-center">
        <UserImage size={100} />
      </div>
      <div>
        <h1 className="text-3xl text-center">{user.displayName}</h1>
      </div>
      <div></div>
      {/* <UserStats user={user}/> */}
    </div>
  );
};
export default ProfileData;
