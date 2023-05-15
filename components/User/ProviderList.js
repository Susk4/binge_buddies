import useTmdb from "../../src/hook/useTmdb";
import { ProviderContext } from "../../src/hook/useFilter";
import { useContext, useMemo } from "react";

import { useState, useEffect } from "react";
import UserFilterRowWrapper from "./UserFilterRowWrapper";
import BingeSelect from "../misc/BingeSelect";

const ProviderList = () => {
  const { providers, setProviders } = useContext(ProviderContext);
  const { getProviders } = useTmdb();
  const [supportedProviders, setSupportedProviders] = useState([]);

  const providerList = [
    { value: 0, label: "Amazon Prime Video" },
    { value: 1, label: "Disney Plus" },
    { value: 2, label: "HBO Max" },
    { value: 3, label: "Hulu" },
    { value: 4, label: "Netflix" },
  ];
  useEffect(() => {
    getProviders().then((data) => {
      setSupportedProviders(data);
    });
  }, []);

  const handleOnChange = (selectedProviders) => {
    const providerIds = supportedProviders
      ?.filter((provider) =>
        selectedProviders.some(
          (selectedProvider) =>
            selectedProvider.label === provider.provider_name
        )
      )
      .map((sp) => sp.provider_id);
    setProviders(providerIds);
  };
  const selectedOptions = useMemo(
    () =>
      providerList.filter((providerListItem) =>
        supportedProviders
          ?.filter((supportedProvider) =>
            providers?.some(
              (provider) => provider === supportedProvider.provider_id
            )
          )
          ?.some(
            (filteredSupportedProvider) =>
              providerListItem.label === filteredSupportedProvider.provider_name
          )
      ),
    [providers, providerList]
  );

  return (
    <UserFilterRowWrapper title="Providers">
      <BingeSelect
        isMulti={true}
        isSearchable={false}
        isDisabled={!providers}
        isLoading={!providers}
        options={providerList}
        value={selectedOptions}
        onChange={handleOnChange}
      />
    </UserFilterRowWrapper>
  );
};
export default ProviderList;
