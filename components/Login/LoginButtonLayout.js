const LoginButtonLayout = ({text, children}) => {
  return (
    <div className="flex">
      <div>
        {children}
      </div>
      <div className=" flex-grow text-center">{text}</div>
    </div>
  );
};
export default LoginButtonLayout;
