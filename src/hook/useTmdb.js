import TmdbService from "../services/TmdbService";
import { useState } from "react";
import useFireStore from "./useFireStore";

export default function useTmdb() {
  const { getUsersMovies } = useFireStore();
  const [loading, setLoading] = useState(false);

  const getGenres = async () => {
    const gs = await TmdbService.getGenres();
    return gs;
  };
  const getProviders = async () => {
    const ps = await TmdbService.getProviders();
    return ps;
  };

  const discoverMovies = async (filter, page = 1, uid) => {
    setLoading(true);
    const usersMovies = await getUsersMovies(uid);
    const movies = await TmdbService.discoverMovies(filter, page, usersMovies);
    setLoading(false);
    return movies;
  };

  return { getGenres, getProviders, discoverMovies, loading };
}
