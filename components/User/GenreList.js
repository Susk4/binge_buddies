import useTmdb from "../../src/hook/useTmdb";
import { useState, useEffect } from "react";
import { GenreContext } from "../../src/hook/useFilter";
import { useContext } from "react";
import OptionsWrapper from "./OptionsWrapper";
import UserFilterRowWrapper from "./UserFilterRowWrapper";

const GenreList = () => {
  const { genres, setGenres } = useContext(GenreContext);

  const { getGenres } = useTmdb();
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    getGenres().then((data) => {
      setGenreList(data.genres);
    });
  }, []);

  const handleGenreChange = (id) => {
    if (genres?.some((ug) => ug == id)) {
      setGenres(genres.filter((ug) => ug != id));
    } else {
      setGenres([...genres, id]);
    }
  };
  if (!genres) return <>Loading...</>;
  return (
    <UserFilterRowWrapper title="Genres">
      <OptionsWrapper>
        {genreList.map(({ name, id }) => (
          <div key={id} className="gap-1 flex">
            <input
              type="checkbox"
              id={name}
              name={name}
              value={name}
              style={{ accentColor: "#7f1d1d" }}
              checked={genres?.some((ug) => ug == id) || false}
              onChange={() => handleGenreChange(id)}
            />
            <label htmlFor={name} className="">
              {name}
            </label>
          </div>
        ))}
      </OptionsWrapper>
    </UserFilterRowWrapper>
  );
};

export default GenreList;
