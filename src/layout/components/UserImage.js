import  useAuth  from "../../hook/useAuth";
import Image from "next/image";
export default function UserImage() {
    const size = 30;
    const { user } = useAuth();

  return (
    <Image
      className=" rounded-full"
      src={user.photoUrl}
      objectFit="cover"
      width={size}
      height={size}
    ></Image>
  );
}
