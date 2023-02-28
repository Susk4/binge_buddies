import { withProtected } from "../../src/hook/route";
import styles from "../../styles/misc/card.module.css";
import ProfileData from "../../components/User/ProfileData";
import UserFilter from "../../components/User/UserFilter";
import Link from "next/link";

function UserPage({ auth }) {
  const { user } = auth;

  if (!user) return <div>Loading</div>;
  return (
    <div
      className={`m-2 p-2 ${styles.card} flex-grow  max-w-lg rounded-xl flex flex-col gap-2 overflow-auto`}
    >
      <ProfileData user={user} />
      <div>
        <hr className="border-gray-400" />
      </div>
      <UserFilter user={user} />
      <div className="flex h-full items-end justify-center">
        <Link href="/">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Start Exploring Now
          </button>
        </Link>
      </div>
    </div>
  );
}
export default withProtected(UserPage);
