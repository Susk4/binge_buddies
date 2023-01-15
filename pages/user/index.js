import UserData from "../../components/User/UserData";
import { withProtected } from "../../src/hook/route";

function UserPage({ auth }) {
  const { user } = auth;

  if (!user) return <div>Loading</div>;
  return (
    <div className="h-screen flex justify-center items-center">
      <UserData user={user} />
    </div>
  );
}
export default withProtected(UserPage);
