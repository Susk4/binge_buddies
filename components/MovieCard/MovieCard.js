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
  const [flipped, setFlipped] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    console.log(flipped);
    controls.start({
      rotateY: flipped ? 180 : 0,
    });
  }, [flipped]);
  const onTap = () => {
    console.log("tapped");
    setFlipped((prev) => !prev);
  };
  return (
    <div className="w-full h-full">
      <Stack onVote={(item, vote) => console.log(item, vote)} list={db}></Stack>
    </div>
  );
};

export default MovieCard;
