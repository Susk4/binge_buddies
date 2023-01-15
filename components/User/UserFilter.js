import ReleaseYearRange from "./ReleaseYearRange";
import GenreList from "./GenreList";
import ProviderList from "./ProviderList";
import useTmdb from "../../src/hook/useTmdb";
import useFireStore from "../../src/hook/useFireStore";
import { useState, useEffect } from "react";

const UserFilter = ({ user }) => {
  const { getUserFilter, updateUserFilter } = useFireStore();
  const { getGenres } = useTmdb();

  const [genres, setGenres] = useState([]);

  const { minReleaseYear, maxReleaseYear } = {
    minReleaseYear: 1850,
    maxReleaseYear: 2023,
  };

  const [userFilter, setUserFilter] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    getGenres().then((data) => {
      setGenres(data.genres);
    });
    getUserFilter(user.uid).then((data) => {
      if (data.release_year) {
        setUserFilter(data);
      } else {
        setUserFilter({
          ...data,
          release_year: { from: minReleaseYear, to: maxReleaseYear },
        });
      }
    });
  }, []);

  useEffect(() => {
    if (updating) {
      updateUserFilter(user.uid, userFilter);
      setUpdating(false);
    }
  }, [updating]);

  if (!userFilter) return <>Loading...</>;
  return (
    <div>
      <h1 className="text-3xl text-center text-orange-900">
        What are you looking for?
      </h1>
      <ReleaseYearRange
        userFilter={userFilter}
        minReleaseYear={minReleaseYear}
        maxReleaseYear={maxReleaseYear}
        setUpdating={setUpdating}
        setUserFilter={setUserFilter}
      />
      <GenreList
        genres={genres}
        userFilter={userFilter}
        setUpdating={setUpdating}
        setUserFilter={setUserFilter}
      />
      <ProviderList
        userFilter={userFilter}
        setUpdating={setUpdating}
        setUserFilter={setUserFilter}
      />
    </div>
  );
};

export default UserFilter;
