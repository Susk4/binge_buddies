import TmdbService from "../services/TmdbService";
import { useState } from "react";

export default function useTmdb() {
  const [loading, setLoading] = useState(false);

  const getGenres = async () => {
    const gs = await TmdbService.getGenres();
    return gs;
  };
  const getProviders = async () => {
    const ps = await TmdbService.getProviders();
    return ps;
  };

  const discoverMovies = async (filter, page = 1) => {
    setLoading(true);
    const movies = await TmdbService.discoverMovies(filter, page);
    setLoading(false);
    return movies;
  };

  return { getGenres, getProviders, discoverMovies, loading };
}
