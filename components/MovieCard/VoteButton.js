import React from "react";
import { motion } from "framer-motion";

const VoteButton = ({ text, onTap, className }) => {
  return (
    <motion.button className={className} onTap={onTap}>
      {text}
    </motion.button>
  );
};

export default VoteButton;
