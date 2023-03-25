import { withProtected } from "../../src/hook/route";
import useFireStore from "../../src/hook/useFireStore";
import styles from "../../styles/misc/card.module.css";
import { useState } from "react";
import { useEffect } from "react";
import MovieList from "../../components/misc/MovieList";
import Loading from "../../components/misc/Loading";
import Pagination from "../../components/movies/Pagination";

function Likes({ auth }) {
  const { deleteMovieFromUser, getUsersMoviesData, loading } = useFireStore();
  const [moviesData, setMoviesData] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    getUsersMoviesData(auth.user.uid, page).then((data) => {
      setMoviesData(data.results);
      setPages(data.total_pages);
    });
  }, [page]);

  const deleteMovie = (movie) => {
    deleteMovieFromUser(auth.user.uid, movie).then(() => {
      getUsersMoviesData(auth.user.uid, page).then((data) => {
        setMoviesData(data.results);
        setPage(data.page);
        setPages(data.total_pages);
      });
    });
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
      className={`m-2 p-2 ${styles.card} flex-shrink basis-auto min-h-0 rounded-xl flex flex-col gap-2 overflow-auto md:w-3/5`}
    >
      <h1 className="text-2xl font-bold text-center ">Likes</h1>
      <MovieList
        movies={moviesData}
        deletableItems={true}
        deleteMovie={deleteMovie}
      />
      <Pagination page={page} setPage={setPage} pages={pages} />
    </div>
  );
}
export default withProtected(Likes);
