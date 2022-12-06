import "../src/config/firebase.config";

import dynamic from "next/dynamic";
import { withProtected } from "../src/hook/route";

function Main({ auth }) {
  const { logout, user } = auth;
  dynamic(() => import("flowbite"), {
    ssr: false,
  });
  return (
    <div>
      <div>{user?.email}</div>
      <div>Main</div>
      <button onClick={logout}> Button</button>
    </div>
  );
}
export default withProtected(Main);
