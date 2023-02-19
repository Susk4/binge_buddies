import React, { useEffect, useState } from "react";
import MovieInfoFace from "./MovieInfoFace";

const FlippableCard = ({ item }) => {
  const [flipCard, setflipCard] = useState(false);
  const {
    poster_path,
    backdrop_path,
    title,
    overview,
    vote_average,
    release_date,
  } = item;

  const releaseYear = release_date.split("-")[0];

  return (
    <div className="rounded-xl flex-grow text-white">
      {!flipCard && (
        <MovieInfoFace
          onClick={() => setflipCard((prev) => !prev)}
          backgroundURL={poster_path}
        ></MovieInfoFace>
      )}
      {flipCard && (
        <MovieInfoFace
          backgroundURL={backdrop_path}
          onClick={() => setflipCard((prev) => !prev)}
        >
          <div
            className="flex items-end p-2"
            style={{
              background: "rgba(0,0,0,0.6)",
            }}
          >
            <div className="flex flex-col gap-3">
              <span className="text-2xl font-bold">{title}</span>
              <div className="flex gap-2 items-center">
                <Pill text={`${vote_average} / 10`} />
                <Pill text={releaseYear} />
              </div>
              <p className="">{overview}</p>
            </div>
          </div>
        </MovieInfoFace>
      )}
    </div>
  );
};

export default FlippableCard;

const Pill = ({ text }) => {
  return (
    <span className="text-lg font-semibold p-1 px-2  rounded-xl bg-teal-400 text-black">
      {text}
    </span>
  );
};
