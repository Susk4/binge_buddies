import Image from "next/image";
import { withProtected } from "../src/hook/route";
import React, { useEffect, useState } from "react";
import styles from "../styles/misc/card.module.css";
import useTmdb from "../src/hook/useTmdb";
import useFireStore from "../src/hook/useFireStore";
import Pagination from "../components/movies/Pagination";
import Loading from "../components/misc/Loading";

const Movies = ({ auth }) => {
  const { user } = auth;
  const { getPopularMovies, searchMovies, loading } = useTmdb();
  const { addMovieToUser, storeMovie, getUsersMovies } = useFireStore();
  const [movies, setMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getPopularMovies(page).then((data) => {
      setMovies(data.results);
      setPages(data.total_pages);
    });

    getUsersMovies(user.uid).then((data) => {
      setLikedMovies(data);
    });
  }, [page]);

  const handleSearch = () => {
    if (query === "") return;
    searchMovies(query, page).then((data) => {
      setMovies(data.results);
      setPages(data.total_pages);
    });
  };
  const handleLike = (movie) => {
    storeMovie(movie);
    addMovieToUser(user.uid, movie).then(
      getUsersMovies(user.uid).then((data) => {
        setLikedMovies(data);
      })
    );
  };

  const isLiked = (movie) => {
    return likedMovies.some((m) => m === movie.id);
  };

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div
      className={`m-2 p-2 ${styles.card} rounded-xl flex flex-col gap-2 flex-grow overflow-auto`}
    >
      <h1 className="text-3xl text-center">Find Movies</h1>

      <div className="flex justify-center md:justify-start gap-2">
        <input
          type="text"
          placeholder="Search"
          className="p-2 rounded-xl shadow-xl"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button
          className="p-2 bg-red-600  hover:bg-red-700 rounded-xl text-lg text-white"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className={` grid sm:grid-cols-2 lg:grid-cols-5  gap-2`}>
        {movies.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col bg-red-50 rounded-xl shadow-xl overflow-hidden gap-2`}
          >
            <div className="flex flex-col flex-grow gap-2">
              <div className="flex justify-center pt-2">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                  alt={m.title}
                  width={200}
                  height={300}
                  className="rounded-xl"
                />
              </div>

              <h3 className="text-center  max-w-xs">{m.title}</h3>
            </div>
            <div className="text-white">
              {isLiked(m) ? (
                <div className="bg-green-600 text-lg">
                  <p className="text-center ">Liked</p>
                </div>
              ) : (
                <div className="flex justify-center pb-2">
                  <button
                    onClick={() => handleLike(m)}
                    className="px-2 py-1 bg-red-600 hover:bg-red-700  text-lg rounded-xl"
                  >
                    Add to liked movies
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Pagination setPage={setPage} page={page} pages={pages} />
    </div>
  );
};

export default withProtected(Movies);
