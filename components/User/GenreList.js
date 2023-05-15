import useTmdb from "../../src/hook/useTmdb";
import { useState, useEffect, useMemo } from "react";
import { GenreContext } from "../../src/hook/useFilter";
import { useContext } from "react";

import UserFilterRowWrapper from "./UserFilterRowWrapper";
import BingeSelect from "../misc/BingeSelect";

const GenreList = () => {
  const { genres, setGenres } = useContext(GenreContext);

  const { getGenres } = useTmdb();
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    getGenres().then((data) => {
      setGenreList(
        data.genres.map(({ name, id }) => ({
          value: id,
          label: name,
        }))
      );
    });
  }, []);

  const handleGenreChange = (selectedGenres) => {
    setGenres(selectedGenres.map((genre) => genre.value));
  };
  const selectedOptions = useMemo(
    () =>
      genreList.filter((genreListItem) =>
        genres?.some((genre) => genre == genreListItem.value)
      ),
    [genres, genreList]
  );
  return (
    <UserFilterRowWrapper title="Genres">
      <BingeSelect
        isMulti={true}
        isSearchable={false}
        isDisabled={!genres}
        isLoading={!genres}
        options={genreList}
        value={selectedOptions}
        onChange={handleGenreChange}
      />
    </UserFilterRowWrapper>
  );
};

export default GenreList;
