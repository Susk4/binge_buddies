import React, { useState } from "react";
import Pill from "./Pill";
import Image from "next/image";
import styles from "../../styles/misc/card.module.css";
import { HiOutlineTrash } from "react-icons/hi";
import BingeDialog from "./BingeDialog";

const MovieList = ({ movies, deletableItems, deleteMovie }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deletableMovie, setDeletableMovie] = useState(null);
  if (movies.length === 0) {
    return <>You have no liked movies.</>;
  }
  return (
    <>
      {movies.map((movie) => {
        return (
          <div key={movie.id} className={`p-2 ${styles.card}`}>
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

              <div className="flex flex-col gap-5">
                <div className="flex gap-2 items-center">
                  <h1 className="text-2xl font-bold">{movie.title}</h1>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Pill text={movie.release_date.split("-")[0]} />
                  <Pill text={`${movie.vote_average} / 10`} />
                  {deletableItems && (
                    <>
                      <button
                        className="text-red-500 flex items-center"
                        onClick={() => {
                          setDeletableMovie(movie);
                          setIsOpen(true);
                        }}
                      >
                        <HiOutlineTrash className="w-6 h-6" />
                        Remove
                      </button>
                    </>
                  )}
                </div>

                <p className="text-sm text-justify">{movie.overview}</p>
              </div>
            </div>
          </div>
        );
      })}
      {deletableItems && (
        <BingeDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Delete Movie"
          description={`Are you sure you want to delete ${deletableMovie?.title}?`}
          callback={() => {
            deleteMovie(deletableMovie.id);
            setIsOpen(false);
            setDeletableMovie(null);
          }}
        />
      )}
    </>
  );
};

export default MovieList;
