import { withProtected } from "../../src/hook/route";
import useFireStore from "../../src/hook/useFireStore";
import styles from "../../styles/misc/card.module.css";
import { useState } from "react";
import { useEffect } from "react";
import Pill from "../../components/misc/Pill";

function Likes({ auth }) {
  const { getUsersMoviesData, loading } = useFireStore();
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    getUsersMoviesData(auth.user.uid).then((data) => {
      setMoviesData(data);
    });
  }, []);

  useEffect(() => {
    console.log(moviesData);
  }, [moviesData]);

  if (loading) {
    return <>Loading...</>;
  }

  if (moviesData.length === 0) {
    return <>You have no liked movies.</>;
  }

  return (
    <div
      className={`m-2 p-2 ${styles.card} flex-shrink basis-auto min-h-0 rounded-xl flex flex-col gap-2 overflow-auto md:w-3/5`}
    >
      <h1 className="text-2xl font-bold text-center ">Likes</h1>
      {moviesData.map((movie) => {
        return (
          <div key={movie.id}>
            <div className={`flex flex-row items-center  gap-2`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-30 h-52 rounded-xl"
              />

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
