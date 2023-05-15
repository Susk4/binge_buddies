import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { HiSwitchHorizontal } from "react-icons/hi";

const MovieInfoFace = ({ styles, children, onClick, backgroundURL }) => {
  return (
    <motion.div
      onTap={onClick}
      className={` ${styles} relative flex h-full overflow-hidden rounded-xl cursor-pointer `}
    >
      <div className="relative w-full h-full">
        <Image
          src={`https://image.tmdb.org/t/p/original/${backgroundURL}`}
          width={500}
          height={750}
          priority
          unoptimized
          alt="Movie Poster"
        />
      </div>
      <div className="absolute h-full w-full">
        <div
          className="absolute right-4 top-4 p-2 rounded-full text-white "
          style={{ backgroundColor: " rgba(0,0,0,0.5)" }}
        >
          <HiSwitchHorizontal className="w-8 h-8" />
        </div>
        {children}
      </div>
    </motion.div>
  );
};

export default MovieInfoFace;
