import { useEffect } from "react";
import { withProtected } from "../src/hook/route";
import useFireStore from "../src/hook/useFireStore";
import { useState } from "react";

function Main({ auth }) {
  const { logout, user } = auth;
  const [users, setUsers] = useState();
  const { getUsers } = useFireStore();

  //fetch users with getUsers
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
      console.log(users);
    };
    fetchUsers();
  }, []);

  if (!users) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <div>{user?.email}</div>
      <div>Main</div>
      <button onClick={logout}> Button</button>

      {users.map((user) => {
        return <div key={user.uid}>{user.name}</div>;
      })}
    </div>
  );
}
export default withProtected(Main);
