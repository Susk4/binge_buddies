import Link from "next/link";
import UserImage from "./UserImage";
import useAuth from "../../hook/useAuth";

const UserImageLink = () => {
  const { user } = useAuth();
  const size = 40;

  const displayedAvatar = user.photoURL ? (
    <UserImage size={size} />
  ) : (
    `User: ${user.displayName}`
  );

  return (
    <Link href="/user" legacyBehavior>
      <a className="flex items-center">{displayedAvatar}</a>
    </Link>
  );
};
export default UserImageLink;
