const ComingSoon = ({ title, shortDescription, longDescription }) => {
  return (
    <div className="flex justify-center h-screen text-center  text-orange-900">
      <div className="flex flex-col mt-48">
        <h1 className="text-4xl md:text-9xl">{title}</h1>
        <h2 className="text-xl md:text-4xl text-orange-800">
          {shortDescription}
        </h2>
        <h3 className="text-xl md:text-2xl text-orange-800 ">
          {longDescription}
        </h3>
      </div>
    </div>
  );
};
export default ComingSoon;
