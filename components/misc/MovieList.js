import React from "react";
import Pill from "./Pill";
import Image from "next/image";

const MovieList = ({ movies }) => {
  if (movies.length === 0) {
    return <>You have no liked movies.</>;
  }
  return (
    <>
      {movies.map((movie) => {
        return (
          <div key={movie.id}>
            <div className="flex flex-row items-center  gap-2">
              <div className="flex-shrink-0 block relative  w-44 h-56  ">
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  layout="fill"
                  objectFit="contain"
                  unoptimized
                  alt="Movie Poster"
                  className="rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{movie.title}</h1>
                <div className="flex gap-2">
                  <Pill text={movie.release_date.split("-")[0]} />
                  <Pill text={`${movie.vote_average} / 10`} />
                </div>

                <p className="text-sm text-justify">{movie.overview}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MovieList;
