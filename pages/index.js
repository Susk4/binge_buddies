import { withProtected } from "../src/hook/route";
import { FilterContext } from "../src/hook/useFilter";
import { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import useTmdb from "../src/hook/useTmdb";

function Main({ auth }) {
  const { userFilter } = useContext(FilterContext);
  const { discoverMovies } = useTmdb();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    if (!userFilter) return;
    discoverMovies(userFilter).then((data) => {
      setMovies(data);
    });
  }, [userFilter]);

  console.log(movies);

  return <MovieCard />;
}
export default withProtected(Main);
