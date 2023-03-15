import LoginList from "../components/Login/LoginList";
import { withPublic } from "../src/hook/route";
import { BiCameraMovie } from "react-icons/bi";

import styles from "../styles/misc/card.module.css";

function Login({ auth }) {
  const { loginWithGoogle, loading, error } = auth;
  return (
    <div
      className={`mx-8 ${styles.card} rounded-xl m-auto p-4 flex flex-col gap-4 text-center`}
    >
      <div className="flex justify-center flex-col items-center ">
        <BiCameraMovie className="w-32 h-32" />

        <h1 className="text-3xl font-bold">Welcome to BingeBuddies</h1>
      </div>
      <div>
        <p className="">
          Please login to addfriends, swipe and <br /> explore the world of
          movies and shows together.
        </p>
      </div>
      <div>
        <hr className="border-black" />
      </div>
      {error && !loading && (
        <div className="">
          <p className="text-red-500 font-semibold">{error}</p>
        </div>
      )}

      <div className="w-2/3 m-auto">
        <LoginList loginWithGoogle={loginWithGoogle} loading={loading} />
      </div>
    </div>
  );
}

export default withPublic(Login);
