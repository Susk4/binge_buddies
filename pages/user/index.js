import { withProtected } from "../../src/hook/route";
import styles from "../../styles/misc/card.module.css";
import ProfileData from "../../components/User/ProfileData";
import UserFilter from "../../components/User/UserFilter";

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
    </div>
  );
}
export default withProtected(UserPage);
