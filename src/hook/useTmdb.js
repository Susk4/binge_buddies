import TmdbService from "../services/TmdbService";
import { useState } from "react";

export default function useTmdb() {
  const getGenres = async () => {
    const gs = await TmdbService.getGenres();
    return gs;
  };
  /* const getProviders = async () => {
    const ps = await TmdbService.getProviders();
    return ps;
  }; */
  return { getGenres };
}
