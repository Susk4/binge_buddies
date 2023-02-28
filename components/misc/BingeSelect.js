import Select from "react-select";

import React from "react";

const BingeSelect = (props) => {
  return (
    <Select
      isMulti
      {...props}
      menuPlacement="auto"
      className="binge-select-container"
      classNamePrefix="binge-select"
      isSearchable={false}
      blurInputOnSelect={true}
    />
  );
};

export default BingeSelect;
