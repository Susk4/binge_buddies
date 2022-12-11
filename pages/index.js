import { useEffect } from "react";
import { withProtected } from "../src/hook/route";
import useFireStore from "../src/hook/useFireStore";

function Main({ auth }) {
  const { logout, user } = auth;
  const { addUser, getUsers, users } = useFireStore();

  useEffect(() => {
    getUsers();
  }, []);

  if (!users) {
    return <div>Loading</div>;
  }
  users.forEach((user) => {
    console.log(user);
  });
  return (
    <div>
      <div>{user?.email}</div>
      <div>Main</div>
      <button onClick={logout}> Button</button>
      <button onClick={() => addUser()}> Set Users</button>
      {users &&
        Object.keys(users).map((key) => {
          return <div key={key}>{users[key].first || users[key].name}</div>;
        })}
    </div>
  );
}
export default withProtected(Main);
