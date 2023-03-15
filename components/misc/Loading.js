import React from "react";
import { Oval } from "react-loader-spinner";

const Loading = ({ size }) => {
  if (!size) size = 80;

  return (
    <Oval
      type="ThreeDots"
      color="red"
      secondaryColor="white"
      height={size}
      width={size}
    />
  );
};

export default Loading;
