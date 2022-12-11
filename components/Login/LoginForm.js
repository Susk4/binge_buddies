import LoginCard from "./LoginCard";

const LoginForm = (props) => {
  return (
    <div className="">
      <div>
        <LoginCard google={props.loginWithGoogle} />
      </div>
    </div>
  );
};

export default LoginForm;
