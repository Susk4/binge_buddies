import React, { useEffect, useState } from "react";
import MovieInfoFace from "./MovieInfoFace";
import Pill from "../misc/Pill";
import styles from "../../styles/flipCard/flipCard.module.css";

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
    <div
      className={`${styles.thecard} ${
        flipCard ? styles.flipCard : ""
      } rounded-xl flex-grow text-white`}
    >
      <MovieInfoFace
        styles={styles.thefront}
        onClick={() => setflipCard((prev) => !prev)}
        backgroundURL={poster_path}
      />

      <MovieInfoFace
        styles={styles.theback}
        backgroundURL={backdrop_path}
        onClick={() => setflipCard((prev) => !prev)}
      >
        <div
          className="flex items-end p-2 h-full"
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
    </div>
  );
};

export default FlippableCard;
