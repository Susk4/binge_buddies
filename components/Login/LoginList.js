import GoogleLogin from "./GoogleLogin";

const LoginList = ({ loginWithGoogle, loading }) => {
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }
  return (
    <div>
      <GoogleLogin loginWithGoogle={loginWithGoogle} />
    </div>
  );
};

export default LoginList;
