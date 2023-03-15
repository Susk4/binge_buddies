import { withProtected } from "../src/hook/route";
import React, { useEffect, useState, useCallback } from "react";
import Card from "../components/MovieCard/Card";
import MovieInfo from "../components/MovieCard/MovieInfo";
import useTmdb from "../src/hook/useTmdb";
import Loading from "../components/misc/Loading";

import useFireStore from "../src/hook/useFireStore";

function Main({ auth }) {
  const { user } = auth;

  const { discoverMovies, loading: discoverLoading } = useTmdb();
  const { addMovieToUser, storeMovie } = useFireStore();
  const [stack, setStack] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (stack && stack.length === 0) {
      discover();
    }
  }, [discover, stack]);

  const discover = useCallback(() => {
    discoverMovies(page, user.uid).then((res) => {
      setStack(res.results && res.results.length ? res.results : null);
      setPage(res.page + 1);
    });
  }, [discoverMovies, page, user.uid]);

  const pop = (array) => {
    return array.filter((_, index) => {
      return index < array.length - 1;
    });
  };

  const handleVote = (item, vote) => {
    let newStack = pop(stack);
    setStack(newStack);

    if (vote === true) {
      addMovieToUser(user.uid, item);
    } else {
    }
    storeMovie(item);
  };

  if (!user || discoverLoading)
    return (
      <div className="w-full h-full overflow-hidden flex justify-center items-center ">
        <Loading />
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
              <MovieInfo item={item} />
            </Card>
          );
        })}
      </div>
    </>
  );
}
export default withProtected(Main);
