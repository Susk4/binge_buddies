import useTmdb from "../../src/hook/useTmdb";
import { useState, useEffect } from "react";
import { FilterContext } from "../../src/hook/useFilter";
import { useContext } from "react";
import OptionsWrapper from "./OptionsWrapper";
import UserFilterRowWrapper from "./UserFilterRowWrapper";

const GenreList = () => {
    const { userFilter, setUserFilter, updating, setUpdating } =
        useContext(FilterContext);

    const { getGenres } = useTmdb();
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getGenres().then((data) => {
            setGenres(data.genres);
        });
    }, []);

    const handleGenreChange = (id) => {
        setUpdating(true);
        if (userFilter.genres?.some((ug) => ug == id)) {
            setUserFilter({
                ...userFilter,
                genres: userFilter.genres.filter((ug) => ug != id),
            });
        } else {
            setUserFilter({
                ...userFilter,
                genres: [...(userFilter.genres || []), id],
            });
        }
    };
    if (!userFilter) return <>Loading...</>;
    return (
        <UserFilterRowWrapper title="Genres">
            <OptionsWrapper>
                {genres.map(({ name, id }) => (
                    <div key={id} className="gap-1 flex">
                        <input
                            type="checkbox"
                            id={name}
                            name={name}
                            value={name}
                            style={{ accentColor: "#7f1d1d" }}
                            checked={
                                userFilter.genres?.some((ug) => ug == id) ||
                                false
                            }
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
