import { withProtected } from "../../src/hook/route";
import styles from "../../styles/misc/card.module.css";
import ProfileData from "../../components/User/ProfileData";
import UserFilter from "../../components/User/UserFilter";
import { FilterContextProvider } from "../../src/hook/useFilter";

function UserPage({ auth }) {
  const { user } = auth;

  if (!user) return <div>Loading</div>;
  return (
    <div
      className={`m-2 ${styles.card}  flex-shrink  basis-auto min-h-0 text-red-900 rounded-xl flex flex-col gap-2 overflow-auto`}
    >
      <ProfileData user={user} />
      <div>
        <hr className="border-gray-400" />
      </div>
      <FilterContextProvider>
        <UserFilter user={user} />
      </FilterContextProvider>
    </div>
  );
}
export default withProtected(UserPage);
