import { ImFacebook } from "react-icons/im";
import LoginButtonLayout from "./LoginButtonLayout";
const FacebookLogin = ({loginWithFacebook}) => {
  return (
    <div className="">
      <button
        onClick={loginWithFacebook}
        className="p-2 rounded bg-blue-500  font-medium w-full"
      >
        <LoginButtonLayout text="Login with Facebook">
          <ImFacebook className="text-2xl" />
        </LoginButtonLayout>
      </button>
    </div>
  );
};
export default FacebookLogin;