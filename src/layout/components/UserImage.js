import useAuth from "../../hook/useAuth";
import Image from "next/image";
import Link from "next/link";

export default function UserImage() {
  const size = 30;
  const { user } = useAuth();

  return (
    <Link href="/user" passHref legacyBehavior>
      <Image
        className=" rounded-full cursor-pointer"
        src={user.photoURL}
        objectFit="cover"
        width={size}
        height={size}
      ></Image>
    </Link>
  );
}
