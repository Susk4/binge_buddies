import GoogleLogin from "./GoogleLogin";

const LoginList = ({ loginWithGoogle }) => {
  return (
    <div>
      <GoogleLogin loginWithGoogle={loginWithGoogle} />
    </div>
  );
};

export default LoginList;
