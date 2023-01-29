import { useState, useEffect } from "react";
import useFireStore from "../../src/hook/useFireStore";
import useAuth from "../../src/hook/useAuth";
import { createContext } from "react";

export const FilterContext = createContext();

export function useFilter() {
  const { user } = useAuth();

  const { getUserFilter, updateUserFilter } = useFireStore();

  const [userFilter, setUserFilter] = useState(null);
  const [updating, setUpdating] = useState(false);

  const { minReleaseYear, maxReleaseYear } = {
    minReleaseYear: 1850,
    maxReleaseYear: 2023,
  };

  useEffect(() => {
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

  return {
    userFilter,
    setUserFilter,
    updating,
    setUpdating,
    minReleaseYear,
    maxReleaseYear,
  };
}

export function FilterContextProvider({ children }) {
  return (
    <FilterContext.Provider value={useFilter()}>
      {children}
    </FilterContext.Provider>
  );
}
