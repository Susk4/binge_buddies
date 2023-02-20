import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const MovieInfoFace = ({ children, onClick, backgroundURL }) => {
  return (
    <motion.div
      onTap={onClick}
      className="relative flex h-full overflow-hidden rounded-xl cursor-pointer "
      /* style={{
        backgroundImage: backgroundURL
          ? `url(https://image.tmdb.org/t/p/original${backgroundURL})`
          : "red",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }} */
    >
      <div className="relative w-full h-full">
        <Image
          src={`https://image.tmdb.org/t/p/original/${backgroundURL}`}
          layout="fill"
          priority
        />
      </div>
      <div className="absolute h-full w-full">{children}</div>
    </motion.div>
  );
};

export default MovieInfoFace;
