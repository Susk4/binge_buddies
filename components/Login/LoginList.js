import GoogleLogin from "./GoogleLogin";
import FacebookLogin from "./FacebookLogin";
const LoginList = ({loginWithGoogle}) => {
  return (
    <div className="flex flex-col gap-2">
      <GoogleLogin loginWithGoogle={loginWithGoogle}/>
      <FacebookLogin />
      
    </div>
  );
};

export default LoginList;
