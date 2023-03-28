import React from "react";
import Image from "next/image";

const MovieInfoCard = ({ movie, isLiked, handleLike }) => {
  return (
    <div
      className={`flex flex-col bg-red-50 rounded-xl shadow-xl overflow-hidden gap-2`}
    >
      <div className="flex flex-col flex-grow gap-2">
        <div className="flex justify-center pt-2">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={200}
            height={300}
            className="rounded-xl"
          />
        </div>

        <h3 className="text-center  max-w-xs">{movie.title}</h3>
      </div>
      <div className="text-white">
        {isLiked ? (
          <div className="bg-green-600 text-lg">
            <p className="text-center ">Liked</p>
          </div>
        ) : (
          <div className="flex justify-center pb-2">
            <button
              onClick={() => handleLike(movie)}
              className="px-2 py-1 bg-red-600 hover:bg-red-700  text-lg rounded-xl"
            >
              Add to liked movies
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieInfoCard;
