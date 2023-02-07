import React, { useState, useEffect, Children } from "react";
import { motion, useAnimation } from "framer-motion";
import Card from "./card";

// basic default styles for container

const Stack = ({ onVote, list, ...props }) => {
  const [stack, setStack] = useState(list);

  // return new array with last item removed
  const pop = (array) => {
    return array.filter((_, index) => {
      return index < array.length - 1;
    });
  };

  const handleVote = (item, vote) => {
    // update the stack
    let newStack = pop(stack);
    setStack(newStack);

    // run function from onVote prop, passing the current item and value of vote
    onVote(item, vote);
  };

  return (
    <>
      <div
        {...props}
        className="w-full h-full overflow-hidden flex justify-center items-center relative"
      >
        {stack.map((item, index) => {
          let isTop = index === stack.length - 1;
          return (
            <Card
              drag={isTop} // Only top card is draggable
              key={item.name || index}
              onVote={(result) => handleVote(item.name, result)}
            >
              <InnerContent item={item} />
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Stack;

const InnerContent = ({ item }) => {
  console.log("rendered");
  const [flipCard, setflipCard] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotateY: flipCard ? 180 : 0,
    });
  }, [flipCard]);
  const onTap = () => {
    setflipCard((prev) => !prev);
  };
  return (
    <motion.div
      key={item.name}
      animate={controls}
      className="flex-grow flex items-center justify-center  bg-red-300"
      style={{ transformStyle: "preserve-3d" }}
      onTap={onTap}
      transition={{ duration: 0.8 }}
    >
      {flipCard && (
        <motion.h1 className="text-3xl font-bold">
          {item.name + " flipCard"}
        </motion.h1>
      )}
      {!flipCard && <h1 className="text-2xl font-bold">{item.name}</h1>}
    </motion.div>
  );
};
