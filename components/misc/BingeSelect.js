import Select from "react-select";
import makeAnimated from "react-select/animated";

import React from "react";

const BingeSelect = (props) => {
  const animatedComponents = makeAnimated();

  return (
    <Select
      isMulti
      {...props}
      components={animatedComponents}
      menuPlacement="auto"
      className="binge-select-container"
      classNamePrefix="binge-select"
    />
  );
};

export default BingeSelect;
