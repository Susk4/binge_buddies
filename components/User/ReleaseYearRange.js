const ReleaseYearRange = () => {
  return (
    <div>
      <h2 className="text-xl text-orange-900">Release Year:</h2>
      <div className="flex flex-col gap-2 ml-10">
        <div className="flex justify-between">
          <label htmlFor="min">From:</label>
          <input
            type="number"
            placeholder="1900"
            id="min"
            className="w-1/2 rounded p-1"
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="max">To:</label>
          <input
            placeholder="2022"
            id="max"
            className="w-1/2 rounded p-1"
          />
        </div>
      </div>
    </div>
  );
};
export default ReleaseYearRange;
