import { ImGoogle } from "react-icons/im";
import LoginButtonLayout from "./LoginButtonLayout";
const GoogleLogin = ({ loginWithGoogle }) => {
  return (
    <div className="">
      <button
        onClick={loginWithGoogle}
        className="p-2 rounded bg-red-500 font-medium w-full"
      >
        <LoginButtonLayout text="Login with Google">
          <ImGoogle className="text-2xl" />
        </LoginButtonLayout>
      </button>
    </div>
  );
};
export default GoogleLogin;
