import useAuth from "../../hook/useAuth";
import Image from "next/image";

export default function UserImage({ size }) {
  const { user } = useAuth();

  return (
    <Image
      className=" rounded-full cursor-pointer"
      src={user.photoURL}
      objectFit="cover"
      width={size}
      height={size}
    ></Image>
  );
}
