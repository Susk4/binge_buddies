import React, { useEffect, useState, useContext, useCallback } from "react";
import Card from "./Card";
import MovieInfo from "./MovieInfo";
import useTmdb from "../../src/hook/useTmdb";
import {
  ReleaseYearContext,
  ProviderContext,
  GenreContext,
} from "../../src/hook/useFilter";
import useFireStore from "../../src/hook/useFireStore";

const MoviesCards = ({ user }) => {
  const { genres } = useContext(GenreContext);
  const { providers } = useContext(ProviderContext);
  const { release_year } = useContext(ReleaseYearContext);

  const { discoverMovies, loading: discoverLoading } = useTmdb();
  const { addMovieToUser, storeMovie } = useFireStore();
  const [stack, setStack] = useState(null);
  const [page, setPage] = useState(1);

  //set initial stack
  useEffect(() => {
    if (genres && providers && release_year) {
      discover();
      console.log("first fetch");
    }
  }, [genres, providers, release_year]);

  // if stack is empty, set it to the list
  useEffect(() => {
    if (stack && stack.length === 0) {
      discover();
      console.log("fetch if empty");
    }
  }, [stack]);

  const discover = useCallback(() => {
    discoverMovies({ genres, providers, release_year }, page, user.uid).then(
      (res) => {
        setStack(res.results && res.results.length ? res.results : null);
        setPage(res.page + 1);
      }
    );
  }, [genres, providers, release_year, page]);

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

  if (discoverLoading)
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
              <MovieInfo item={item} />
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default MoviesCards;
