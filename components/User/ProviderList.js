const ProviderList = () => {
  const providers = [
    "Netflix",
    "Hulu",
    "Disney+",
    "Amazon Prime",
    "HBO Max",
    "Apple TV+",
  ];
  return (
    <div>
      <h2 className="text-xl text-orange-900">Providers:</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2 ml-10">
        {providers.map((provider, index) => (
          <div key={index} className="gap-1 flex">
            <input
              type="checkbox"
              id={provider}
              name={provider}
              value={provider}
            />
            <label htmlFor={provider} className="flex items-center">
              {provider}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProviderList;
