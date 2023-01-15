import useTmdb from "../../src/hook/useTmdb";
import useAuth from "../../src/hook/useAuth";
import useFireStore from "../../src/hook/useFireStore";
import { useState, useEffect, useMemo } from "react";

const GenreList = () => {
  const { user } = useAuth();
  const { getUserFilter, updateUserFilter } = useFireStore();
  const { getGenres } = useTmdb();
  const [genres, setGenres] = useState([]);

  const [updating, setUpdating] = useState(false);

  const [userFilter, setUserFilter] = useState(null);

  useEffect(() => {
    getGenres().then((data) => {
      setGenres(data.genres);
    });
    getUserFilter(user.uid).then((data) => {
      setUserFilter(data);
    });
  }, []);
  useMemo(() => {
    if (updating) {
      updateUserFilter(user.uid, userFilter);
      setUpdating(false);
    }
  }, [userFilter]);

  const handleOnChange = (id) => {
    setUpdating(true);
    if (userFilter.genres?.some((ug) => ug == id)) {
      setUserFilter({
        userFilter,
        genres: userFilter.genres.filter((ug) => ug != id),
      });
    } else {
      setUserFilter({ ...userFilter, genres: [...userFilter.genres || [], id] });
    }
  };
  if (!userFilter) return <>Loading...</>;
  return (
    <div>
      <h2 className="text-xl text-orange-900">Genres:</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 ml-10">
        {genres.map(({ name, id }) => (
          <div key={id} className="gap-1 flex">
            <input
              type="checkbox"
              id={name}
              name={name}
              value={name}
              checked={userFilter.genres?.some((ug) => ug == id)}
              onChange={() => handleOnChange(id)}
            />
            <label htmlFor={name} className="flex items-center">
              {name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreList;
