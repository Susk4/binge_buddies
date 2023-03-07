import { withProtected } from "../../src/hook/route";
import useFireStore from "../../src/hook/useFireStore";
import styles from "../../styles/misc/card.module.css";
import { useState } from "react";
import { useEffect } from "react";
import Pill from "../../components/misc/Pill";
import Image from "next/image";
import FireStoreService from "../../src/services/FireStoreService";

import useAuth from "../../src/hook/useAuth";

function Likes({ auth, movies }) {
  if (movies.length === 0) {
    return <>You have no liked movies.</>;
  }

  return (
    <div
      className={`m-2 p-2 ${styles.card} flex-shrink basis-auto min-h-0 rounded-xl flex flex-col gap-2 overflow-auto md:w-3/5`}
    >
      <h1 className="text-2xl font-bold text-center ">Likes</h1>
      {movies.map((movie) => {
        return (
          <div key={movie.id}>
            <div className="flex flex-row items-center  gap-2">
              <div className="flex-shrink-0 block relative  w-44 h-56">
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  layout="fill"
                  priority
                  objectFit="contain"
                  unoptimized
                  alt="Movie Poster"
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
    </div>
  );
}
export default withProtected(Likes);

// server side render for this page
export async function getServerSideProps(context) {
  const { uid } = context.req.cookies;
  //const { getUsersMoviesData } = useFireStore();

  if (!uid) return { props: {} };
  const moviesData = await FireStoreService.getUsersMoviesData(uid);

  return {
    props: {
      movies: moviesData,
    },
  };
}
