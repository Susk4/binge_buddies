import useTmdb from "../../src/hook/useTmdb";
import { ProviderContext } from "../../src/hook/useFilter";
import { useContext, useMemo } from "react";

import { useState, useEffect } from "react";
import OptionsWrapper from "./OptionsWrapper";
import UserFilterRowWrapper from "./UserFilterRowWrapper";

const ProviderList = () => {
  const { providers, setProviders } = useContext(ProviderContext);
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
    return providers?.includes(providerId);
  };

  const handleOnChange = (providerName) => {
    const providerIds = supportedProviders
      ?.filter((provider) => provider.provider_name == providerName)
      .map((sp) => sp.provider_id);
    if (providers.some((up) => providerIds.includes(up))) {
      setProviders(providers.filter((up) => !providerIds.includes(up)));
    } else {
      setProviders([...(providers || []), ...providerIds]);
    }
  };

  if (!providers) return <>Loading...</>;

  return (
    <UserFilterRowWrapper title="Providers">
      <OptionsWrapper>
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
            <label
              htmlFor={provider}
              className="flex items-center overflow-hidden"
            >
              {provider}
            </label>
          </div>
        ))}
      </OptionsWrapper>
    </UserFilterRowWrapper>
  );
};
export default ProviderList;
