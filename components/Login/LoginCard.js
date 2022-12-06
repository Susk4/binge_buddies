const LoginCard = (props) => {
  return (
    <div className="">
      <button onClick={props.google} className="">
        Login with Google
      </button>
    </div>
  );
};

export default LoginCard;
