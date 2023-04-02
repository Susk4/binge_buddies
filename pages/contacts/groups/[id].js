import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { withProtected } from "../../../src/hook/route";
import useFireStore from "../../../src/hook/useFireStore";
import styles from "../../../styles/misc/card.module.css";
import MovieList from "../../../components/misc/MovieList";
import Loading from "../../../components/misc/Loading";
import Pagination from "../../../components/movies/Pagination";

const GroupMovies = ({ auth }) => {
  const router = useRouter();
  const { user } = auth;
  const { id } = router.query;
  const { getGroupMovies, loading } = useFireStore();
  const [error, setError] = useState(null);
  const [moviesData, setMoviesData] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    if (id) {
      getGroupMovies(id, user.uid, page).then((res) => {
        if (res.error) {
          setError(res.error.message);
        } else {
          setMoviesData(res.results);
          setPages(res.total_pages);
        }
      });
    }
  }, [id, page]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <div
      className={`m-2 p-2 ${styles.card} flex-shrink basis-auto min-h-0 rounded-xl flex flex-col gap-2 overflow-auto md:w-3/5`}
    >
      <h1 className="text-2xl font-bold text-center ">Matches</h1>
      <MovieList movies={moviesData} />
      {moviesData.length !== 0 && (
        <Pagination page={page} setPage={setPage} pages={pages} />
      )}
    </div>
  );
};

export default withProtected(GroupMovies);
