import TmdbService from "../services/TmdbService";
import { useState } from "react";
import useFireStore from "./useFireStore";

export default function useTmdb() {
  const { getUser } = useFireStore();
  const [loading, setLoading] = useState(false);

  const getGenres = async () => {
    const gs = await TmdbService.getGenres();
    return gs;
  };
  const getProviders = async () => {
    const ps = await TmdbService.getProviders();
    return ps;
  };

  const discoverMovies = async (page = 1, uid) => {
    setLoading(true);
    const user = await getUser(uid);
    const movies = await TmdbService.discoverMovies(
      user.filters,
      page,
      user.movies
    );
    setLoading(false);
    return movies;
  };

  const getPopularMovies = async (page) => {
    setLoading(true);
    const movies = await TmdbService.getPopularMovies(page);
    setLoading(false);
    return movies;
  };

  const searchMovies = async (query, page) => {
    setLoading(true);
    const movies = await TmdbService.searchMovies(query, page);
    setLoading(false);
    return movies;
  };

  return {
    getGenres,
    getProviders,
    discoverMovies,
    getPopularMovies,
    searchMovies,
    loading,
  };
}
