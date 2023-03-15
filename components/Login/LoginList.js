import GoogleLogin from "./GoogleLogin";
import Loading from "../misc/Loading";

const LoginList = ({ loginWithGoogle, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <GoogleLogin loginWithGoogle={loginWithGoogle} />
    </div>
  );
};

export default LoginList;
