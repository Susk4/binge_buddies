import useTmdb from "../../src/hook/useTmdb";
import { FilterContext } from "../../src/hook/useFilter";
import { useContext } from "react";

import { useState, useEffect } from "react";

const ProviderList = () => {
  const { userFilter, setUserFilter, setUpdating } = useContext(FilterContext);
  const { getProviders } = useTmdb();
  const [supportedProviders, setSupportedProviders] = useState(null);

  const providerList = [
    "Amazon Prime Video",
    "Disney Plus",
    "HBO Max",
    "Hulu",
    "Netflix",
  ];
  useEffect(() => {
    getProviders().then((data) => {
      setSupportedProviders(data);
    });
  }, []);

  const isSelected = (providerName) => {
    const providerId = supportedProviders?.filter(
      (provider) => provider.provider_name == providerName
    )[0].provider_id;
    return userFilter && userFilter.providers?.includes(providerId);
  };

  const handleOnChange = (providerName) => {
    setUpdating(true);
    const providerIds = supportedProviders
      ?.filter((provider) => provider.provider_name == providerName)
      .map((sp) => sp.provider_id);
    if (userFilter.providers?.some((up) => providerIds.includes(up))) {
      setUserFilter({
        ...userFilter,
        providers: userFilter.providers.filter(
          (up) => !providerIds.includes(up)
        ),
      });
    } else {
      setUserFilter({
        ...userFilter,
        providers: [...(userFilter.providers || []), ...providerIds],
      });
    }
  };

  if (!userFilter) return <>Loading...</>;

  return (
    <div>
      <h2 className="text-xl ">Providers:</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 ml-10">
        {providerList.map((provider, index) => (
          <div key={index} className="gap-1 flex">
            <input
              type="checkbox"
              id={provider}
              name={provider}
              value={provider}
              style={{ accentColor: "#7f1d1d" }}
              checked={isSelected(provider) || false}
              onChange={() => handleOnChange(provider)}
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
