import { useEffect } from "react";
import { withProtected } from "../src/hook/route";
import useFireStore from "../src/hook/useFireStore";
import { useState } from "react";
import { BiCameraMovie } from "react-icons/bi";

function Main({ auth }) {
  const { logout, user } = auth;
  const [users, setUsers] = useState();
  const { getUsers } = useFireStore();

  //fetch users with getUsers
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  if (!users) {
    return <div>Loading</div>;
  }
  return (
    <div className="flex justify-center h-screen text-center bg-orange-200 text-orange-900">
      <div className="flex flex-col mt-48">
        <h1 className="text-4xl md:text-9xl">BingeBuddies</h1>
        <h2 className="text-xl md:text-4xl text-orange-800">
          BingeBuddies is launching very soon.
        </h2>
        <h3 className="text-xl md:text-2xl text-orange-800 ">
          Dont forget to check back regularly for updates
        </h3>
        <div className=" self-center">
          <BiCameraMovie className="w-24 h-24 md:w-44 md:h-44" />
        </div>
      </div>
    </div>
  );
}
export default withProtected(Main);
