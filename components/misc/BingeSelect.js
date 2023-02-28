import Select from "react-select";

import React from "react";

const BingeSelect = (props) => {
  const optionsWithSelectAll = [
    { value: "all", label: "Select All" },
    ...props.options,
  ];
  const handleOnChange = (selectedOptions) => {
    if (selectedOptions.some((option) => option.value === "all")) {
      props.onChange(
        optionsWithSelectAll.filter((option) => option.value !== "all")
      );
    } else {
      props.onChange(selectedOptions);
    }
  };

  return (
    <Select
      isMulti
      options={optionsWithSelectAll}
      isLoading={props.isLoading}
      isDisabled={props.isDisabled}
      onChange={handleOnChange}
      value={props.value}
      menuPlacement="auto"
      className="binge-select-container"
      classNamePrefix="binge-select"
      isSearchable={false}
      blurInputOnSelect={true}
    />
  );
};

export default BingeSelect;
