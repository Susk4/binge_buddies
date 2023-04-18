import Image from "next/image";
import { withProtected } from "../src/hook/route";
import React, { useEffect, useState } from "react";
import styles from "../styles/misc/card.module.css";
import useTmdb from "../src/hook/useTmdb";
import useFireStore from "../src/hook/useFireStore";
import Pagination from "../components/movies/Pagination";
import Loading from "../components/misc/Loading";
import SearchBar from "../components/movies/SearchBar";
import MovieInfoCard from "../components/movies/MovieInfoCard";

const Movies = ({ auth }) => {
  const { user } = auth;
  const { getPopularMovies, searchMovies, loading } = useTmdb();
  const { addMovieToUser, storeMovie, getUsersMovies } = useFireStore();
  const [movies, setMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [query, setQuery] = useState("");

  const setPopularData = () => {
    getPopularMovies(page).then((data) => {
      setMovies(data.results);
      setPages(data.total_pages);
    });
  };
  const setUserMovieData = () => {
    getUsersMovies(user.uid).then((data) => {
      setLikedMovies(data);
    });
  };

  const setSearchData = () => {
    searchMovies(query, page).then((data) => {
      setMovies(data.results);
      setPages(data.total_pages);
    });
  };

  const handleFetch = () => {
    if (query === "") {
      setPopularData();
      setUserMovieData();
    } else {
      setSearchData();
    }
  };

  useEffect(() => {
    handleFetch();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    handleFetch();
  };
  const handleLike = (movie) => {
    storeMovie(movie);
    addMovieToUser(user.uid, movie).then(setUserMovieData());
  };

  const isLiked = (movie) => {
    return likedMovies.some((m) => m === movie.id);
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div
      className={`m-2 p-2 ${styles.card} rounded-xl flex flex-col gap-2 flex-grow overflow-auto  w-5/6`}
    >
      <h1 className="text-3xl text-center">Find Movies</h1>

      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />

      <div className="flex-grow flex items-center justify-center">
        {movies.length === 0 && (
          <div className="flex-grow flex justify-center items-center">
            <h1 className="text-2xl">No movies found</h1>
          </div>
        )}
        <div className={` grid sm:grid-cols-2 lg:grid-cols-5  gap-2`}>
          {movies.map((m) => (
            <MovieInfoCard
              key={m.id}
              movie={m}
              isLiked={isLiked(m)}
              handleLike={handleLike}
            />
          ))}
        </div>
      </div>

      <Pagination setPage={setPage} page={page} pages={pages} />
    </div>
  );
};

export default withProtected(Movies);
