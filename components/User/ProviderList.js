//import useTmdb from "../../src/hook/useTmdb";
import { useState, useEffect } from "react";

const ProviderList = () => {
  //const { getProviders } = useTmdb();
  const [providers, setProviders] = useState([]);
  const providerList = [
    "Amazon Prime Video",
    "Disney Plus",
    "HBO Max",
    "Hulu",
    "Netflix",
  ];
  useEffect(() => {
    /* getProviders().then((data) => {
      setProviders(data.results);
    }); */
  }, []);

  return (
    <div>
      <h2 className="text-xl text-orange-900">Providers:</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 ml-10">
        {providerList.map((provider, index) => (
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
