import React from "react";
import { HiSwitchHorizontal } from "react-icons/hi";
import { motion } from "framer-motion";

const MovieInfoFace = ({ children, onClick, backgroundURL }) => {
  return (
    <motion.div
      onTap={onClick}
      className="flex h-full overflow-hidden rounded-xl cursor-pointer "
      style={{
        backgroundImage: backgroundURL
          ? `url(https://image.tmdb.org/t/p/original${backgroundURL})`
          : "red",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
    </motion.div>
  );
};

export default MovieInfoFace;
