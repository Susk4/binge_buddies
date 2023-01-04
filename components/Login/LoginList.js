import GoogleLogin from "./GoogleLogin";
import FacebookLogin from "./FacebookLogin";
const LoginList = ({loginWithGoogle, loginWithFacebook}) => {
  return (
    <div className="flex flex-col gap-2">
      <GoogleLogin loginWithGoogle={loginWithGoogle}/>
      <FacebookLogin loginWithFacebook={loginWithFacebook}/>
      
    </div>
  );
};

export default LoginList;
