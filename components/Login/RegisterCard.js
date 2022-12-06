const RegisterCard = () => {
  return (
    <div className="flex-col m-auto bg-blue-500 p-4 rounded-lg">
      <div className="">
        <input
          id="email"
          type="email"
          className="rounded-t-lg border-b-2 p-2 w-96"
          placeholder="E-mail address"
        />
      </div>
      <div className="">
        <input
          id="password"
          type="password"
          className="rounded-b-lg p-2 w-96"
          placeholder="Password"
        />
      </div>
      <div className="content-center flex-col">
        <button className="flex justify-center rounded-lg border-black p-2 mt-2 bg-red-200 m-auto hover:bg-red-300 w-96">
          Register
        </button>
        <button className="flex rounded-lg border-black p-2 mt-2 m-auto invisible">
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterCard;
