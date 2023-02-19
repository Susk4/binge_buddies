import { useState } from "react";
import FireStoreService from "../services/FireStoreService";

export default function useFireStore() {
  const addUser = async (user, filterData) => {
    if (!user) {
      return;
    }
    await FireStoreService.addUser(user, filterData);
  };
  const getUsers = async () => {
    const users = await FireStoreService.getUsers();
    return users;
  };

  const getUser = async (uid) => {
    const user = await FireStoreService.getUser(uid);
    return user;
  };

  const getUserFilter = async (uid) => {
    const userFilter = await FireStoreService.getUserFilter(uid);
    return userFilter;
  };

  const updateUserFilter = async (uid, filterData) => {
    await FireStoreService.updateUserFilter(uid, filterData);
  };

  const getUsersMovies = async (uid) => {
    const usersMovies = await FireStoreService.getUsersMovies(uid);
    return usersMovies;
  };

  const addMovieToUser = async (uid, movie) => {
    await FireStoreService.addMovieToUser(uid, movie);
  };
  const storeMovie = async (movie) => {
    await FireStoreService.storeMovie(movie);
  };

  return {
    addUser,
    getUsers,
    getUser,
    getUserFilter,
    updateUserFilter,
    addMovieToUser,
    storeMovie,
    getUsersMovies,
  };
}
