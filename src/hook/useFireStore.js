import { useState } from "react";
import FireStoreService from "../services/FireStoreService";

export default function useFireStore() {
  const [loading, setLoading] = useState(false);

  const addUser = async (user, filterData) => {
    if (!user) {
      return;
    }
    await FireStoreService.addUser(user, filterData);
  };
  const getPossibleContacts = async (uid) => {
    setLoading(true);
    const users = await FireStoreService.getPossibleContacts(uid);
    setLoading(false);
    return users;
  };

  const getUser = async (uid) => {
    setLoading(true);
    const user = await FireStoreService.getUser(uid);
    setLoading(false);
    return user;
  };

  const getUsers = async (uids) => {
    setLoading(true);
    const users = await FireStoreService.getUsers(uids);
    setLoading(false);
    return users;
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

  const getUsersMoviesData = async (uid) => {
    setLoading(true);
    const usersMovies = await FireStoreService.getUsersMoviesData(uid);
    setLoading(false);
    return usersMovies;
  };

  const getContactRequests = async (uid) => {
    setLoading(true);
    const contactRequests = await FireStoreService.getContactRequests(uid);
    setLoading(false);
    return contactRequests;
  };

  const getContacts = async (uid) => {
    setLoading(true);
    const contacts = await FireStoreService.getContacts(uid);
    setLoading(false);
    return contacts;
  };

  const getContactRequestsSent = async (uid) => {
    setLoading(true);
    const contactRequestsSent = await FireStoreService.getContactRequestsSent(
      uid
    );
    setLoading(false);
    return contactRequestsSent;
  };

  const acceptContactRequest = async (contact) => {
    await FireStoreService.acceptContactRequest(contact);
  };
  const declineContactRequest = async (contact) => {
    await FireStoreService.declineContactRequest(contact);
  };
  const sendContactRequest = async (uid, contact) => {
    await FireStoreService.sendContactRequest(uid, contact);
  };

  const createGroup = async (name, description, users, creator) => {
    setLoading(true);
    const groupId = await FireStoreService.createGroup(
      name,
      description,
      users,
      creator
    );
    setLoading(false);
    return groupId;
  };

  const getPendingGroups = async (uid) => {
    setLoading(true);
    const pendingGroups = await FireStoreService.getPendingGroups(uid);
    setLoading(false);
    return pendingGroups;
  };

  const getSentGroupRequests = async (uid) => {
    setLoading(true);
    const sentGroupRequests = await FireStoreService.getSentGroupRequests(uid);
    setLoading(false);
    return sentGroupRequests;
  };

  return {
    loading,
    addUser,
    getPossibleContacts,
    getContactRequests,
    getContacts,
    getContactRequestsSent,
    acceptContactRequest,
    declineContactRequest,
    sendContactRequest,
    createGroup,
    getPendingGroups,
    getSentGroupRequests,
    getUser,
    getUsers,
    getUserFilter,
    updateUserFilter,
    addMovieToUser,
    storeMovie,
    getUsersMoviesData,
    getUsersMovies,
  };
}
