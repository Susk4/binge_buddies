import { useState } from "react";
import FireStoreService from "../services/FireStoreService";

export default function useFireStore() {
  const addUser = async (user) => {
    if (!user) {
      return;
    }
    await FireStoreService.addUser(user);
  };
  const getUsers = async () => {
    const users = await FireStoreService.getUsers();
    return users;
  };
  return { addUser, getUsers };
}
