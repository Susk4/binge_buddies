import { withProtected } from "../../src/hook/route";
import styles from "../../styles/User/User.module.css";
import ProfileData from "../../components/User/ProfileData";
import UserFilter from "../../components/User/UserFilter";
import { FilterContextProvider } from "../../src/hook/useFilter";

function UserPage({ auth }) {
  const { user } = auth;

  if (!user) return <div>Loading</div>;
  return (
    <div className="h-screen flex justify-center items-center p-4 lg:p-0">
      <div
        className={`${styles.card} bg-orange-100 rounded-xl p-2 flex flex-col gap-2`}
      >
        <ProfileData user={user} />
        <div>
          <hr className="border-gray-400" />
        </div>
        <FilterContextProvider>
          <UserFilter user={user} />
        </FilterContextProvider>
      </div>
    </div>
  );
}
export default withProtected(UserPage);
