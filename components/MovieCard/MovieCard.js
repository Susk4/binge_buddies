import Stack from "./Stack";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const db = [
  {
    name: "1",
  },
  {
    name: "2",
  },
  {
    name: "3",
  },
  {
    name: "4",
  },
  {
    name: "5",
  },
];

const MovieCard = () => {
  return (
    <div className="w-full h-full">
      <Stack onVote={(item, vote) => console.log(item, vote)} list={db}></Stack>
    </div>
  );
};

export default MovieCard;
