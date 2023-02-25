import { useState, useEffect } from "react";
import useFireStore from "../../src/hook/useFireStore";
import useAuth from "../../src/hook/useAuth";
import { createContext } from "react";

export const FilterContext = createContext();
export const GenreContext = createContext();
export const ProviderContext = createContext();
export const ReleaseYearContext = createContext();

export function FilterContextProvider({ children }) {
  const { user } = useAuth();

  const { getUserFilter, updateUserFilter } = useFireStore();

  const [genres, setGenres] = useState(null);
  const [providers, setProviders] = useState(null);
  const [release_year, setReleaseYear] = useState(null);

  const { minReleaseYear, maxReleaseYear } = {
    minReleaseYear: 1850,
    maxReleaseYear: 2023,
  };

  useEffect(() => {
    if (user) {
      getUserFilter(user.uid).then((data) => {
        if (data.release_year) {
          setGenres(data.genres);
          setProviders(data.providers);
          setReleaseYear(data.release_year);
        } else {
          setGenres(data.genres);
          setProviders(data.providers);
          setReleaseYear({ from: minReleaseYear, to: maxReleaseYear });
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (user && genres && providers && release_year)
      updateUserFilter(user.uid, { genres, providers, release_year });
  }, [genres, providers, release_year]);

  return (
    <FilterContext.Provider>
      <ReleaseYearContext.Provider
        value={{ release_year, setReleaseYear, minReleaseYear, maxReleaseYear }}
      >
        <ProviderContext.Provider value={{ providers, setProviders }}>
          <GenreContext.Provider value={{ genres, setGenres }}>
            {children}
          </GenreContext.Provider>
        </ProviderContext.Provider>
      </ReleaseYearContext.Provider>
    </FilterContext.Provider>
  );
}
