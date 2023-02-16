import React, { useEffect, useState, useContext, useCallback } from "react";
import Card from "./Card";
import FlippableCard from "./FlippableCard";
import useTmdb from "../../src/hook/useTmdb";
import { FilterContext } from "../../src/hook/useFilter";

const MoviesCards = () => {
  const { userFilter, loading: filterLoading } = useContext(FilterContext);
  const { discoverMovies, loading: discoverLoading } = useTmdb();
  const [stack, setStack] = useState(null);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [page, setPage] = useState(1);

  //set initial stack
  useEffect(() => {
    if (userFilter) {
      discover();
    }
  }, [userFilter]);

  // if stack is empty, set it to the list
  useEffect(() => {
    if (stack && stack.length === 0) {
      discover();
    }
  }, [stack]);

  const discover = useCallback(() => {
    discoverMovies(userFilter, page).then((res) => {
      setStack(res.results.length ? res.results : null);
      setPage(res.page + 1);
    });
  }, [userFilter, page]);

  const pop = (array) => {
    return array.filter((_, index) => {
      return index < array.length - 1;
    });
  };

  const handleVote = (item, vote) => {
    let newStack = pop(stack);
    setStack(newStack);

    if (vote === true) {
      setLikes([...likes, item]);
    } else {
      setDislikes([...dislikes, item]);
    }

    console.log("last item: ", item, vote);
  };

  useEffect(() => {
    console.log("likes", likes);
    console.log("dislikes", dislikes);
  }, [likes, dislikes]);

  if (discoverLoading || filterLoading)
    return (
      <div className="w-full h-full overflow-hidden flex justify-center items-center ">
        Loading...
      </div>
    );
  if (!stack)
    return (
      <div className="w-full h-full overflow-hidden flex justify-center items-center ">
        No available movies. Try changing filters.
      </div>
    );

  return (
    <>
      <div className="w-full h-full overflow-hidden flex justify-center items-center ">
        {stack.map((item, index) => {
          let isTop = index === stack.length - 1;
          return (
            <Card
              drag={isTop} // Only top card is draggable
              key={item.name || index}
              onVote={(result) => handleVote(item, result)}
            >
              <FlippableCard item={item} />
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default MoviesCards;