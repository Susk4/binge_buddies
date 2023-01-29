import LoginList from "../components/Login/LoginList";
import { withPublic } from "../src/hook/route";

import styles from "../styles/Login/Login.module.css";

function Login({ auth }) {
  const { loginWithGoogle, loading, error } = auth;
  return (
    <div className="h-screen flex justify-center items-center">
      <div
        className={`${styles.card} bg-orange-100  text-orange-900 rounded-xl w-5/6 md:w-1/2 lg:w-1/4 xl:w-1/4 p-4 flex flex-col gap-4 `}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Welcome to BingeBuddies
          </h1>
        </div>
        <div>
          <p className="text-center">
            Please login to add friends, swipe and explore the world of movies
            and shows together.
          </p>
        </div>
        <div>
          <hr className="border-black-200" />
        </div>
        {error && !loading && (
          <div className="text-center">
            <p className="text-red-500 font-semibold">{error}</p>
          </div>
        )}

        <div className="w-2/3 m-auto">
          <LoginList loginWithGoogle={loginWithGoogle} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default withPublic(Login);
