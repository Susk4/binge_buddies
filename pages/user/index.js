import {withProtected} from "../../src/hook/route";
function UserPage({ auth }) {
  const { user } = auth;
  return <>Username:{user.name}</>;
}
export default withProtected(UserPage);
