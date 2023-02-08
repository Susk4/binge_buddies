import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import VoteButtonBar from "./VoteButtonBar";

const Card = ({ children, style, onVote, id, ...props }) => {
  // motion stuff
  const cardElem = useRef(null);

  const x = useMotionValue(0);
  const controls = useAnimation();

  const [constrained, setConstrained] = useState(true);

  const [direction, setDirection] = useState();

  const [offset, setOffset] = useState(0);

  const getVote = (childNode, parentNode) => {
    const childRect = childNode.getBoundingClientRect();
    const parentRect = parentNode.getBoundingClientRect();
    let result =
      parentRect.left >= childRect.right
        ? false
        : parentRect.right <= childRect.left
        ? true
        : undefined;
    return result;
  };

  // determine direction of swipe based on velocity
  const getDirection = () => {
    return offset >= 1 ? "right" : offset <= -1 ? "left" : undefined;
  };

  const getTrajectory = () => {
    setOffset(x.get());
    setDirection(getDirection());
  };

  const flyAway = (min) => {
    const flyAwayDistance = (direction) => {
      const parentWidth =
        cardElem.current.parentNode.getBoundingClientRect().width;
      const childWidth = cardElem.current.getBoundingClientRect().width;
      return direction === "left"
        ? -parentWidth / 2 - childWidth / 2
        : parentWidth / 2 + childWidth / 2;
    };

    if (direction && Math.abs(offset) > min) {
      setConstrained(false);
      controls.start({
        x: flyAwayDistance(direction),
      });
    }
  };
  useEffect(() => {
    const unsubscribeX = x.on("change", () => {
      if (cardElem.current) {
        const childNode = cardElem.current;
        const parentNode = cardElem.current.parentNode;
        const result = getVote(childNode, parentNode);
        result !== undefined && onVote(result);
      }
    });

    return () => unsubscribeX();
  });
  const like = async () => {
    await controls.start({
      x: cardElem.current.parentNode.getBoundingClientRect().width / 2,
    });
    onVote(true);
  };
  const dislike = async () => {
    await controls.start({
      x: (-1 * cardElem.current.parentNode.getBoundingClientRect().width) / 2,
    });
    onVote(false);
  };

  return (
    <motion.div
      className="absolute w-5/6 h-4/6 max-w-md max-h-md flex "
      animate={controls}
      dragConstraints={constrained && { left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      ref={cardElem}
      style={{ x }}
      onDrag={getTrajectory}
      onDragEnd={() => flyAway(500)}
      {...props}
    >
      <div className="flex-grow flex flex-col p-2 rounded-xl bg-white">
        {children}

        <VoteButtonBar like={like} dislike={dislike} />
      </div>
    </motion.div>
  );
};

export default Card;
