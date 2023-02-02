const LoginButtonLayout = ({text, children}) => {
  return (
    <div className="flex text-white">
      <div>
        {children}
      </div>
      <div className=" flex-grow text-center">{text}</div>
    </div>
  );
};
export default LoginButtonLayout;
