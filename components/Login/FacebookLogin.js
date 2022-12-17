import { ImFacebook } from "react-icons/im";
import LoginButtonLayout from "./LoginButtonLayout";
const FacebookLogin = () => {
  return (
    <div className="">
      <button
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