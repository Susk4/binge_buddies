import LoginList from "../components/Login/LoginList";
import { withPublic } from "../src/hook/route";

import styles from "../styles/Login.module.css";

function Login({ auth }) {
  const { loginWithGoogle, error } = auth;
  return (
    <div className="h-screen flex justify-center items-center">
      <div
        className={`bg-orange-300 rounded-xl w-5/6 md:w-1/2 lg:w-1/4 xl:w-1/4  text-white p-4 flex flex-col gap-4 ${styles.card} `}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-orange-900">
            Welcome to BingeBuddies
          </h1>
        </div>
        <div>
          <p className="text-center text-orange-900">
            Please login to add friends, swipe and explore the world of movies and shows together.
          </p>
        </div>
        <div>
          <hr className="border-orange-200"/>
        </div>
        {error && <div className="text-center">
          <p className="text-red-500">{error}</p>
        </div>}

        <div className="w-2/3 m-auto">
          <LoginList loginWithGoogle={loginWithGoogle} />
        </div>
      </div>
    </div>
  );
}

export default withPublic(Login);
