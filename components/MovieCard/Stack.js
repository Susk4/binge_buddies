import React, { useState } from "react";
import Card from "./Card";
import FlippableCard from "./FlippableCard";

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
        className="w-full h-full overflow-hidden flex justify-center items-center "
      >
        {stack.map((item, index) => {
          let isTop = index === stack.length - 1;
          return (
            <Card
              drag={isTop} // Only top card is draggable
              key={item.name || index}
              onVote={(result) => handleVote(item.name, result)}
            >
              <FlippableCard item={item} />
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Stack;
