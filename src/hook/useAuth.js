import { createContext, useContext, useState } from "react";
import AuthService from "../services/AuthService";
import useFireStore from "./useFireStore";

const authContext = createContext();

export default function useAuth() {
  return useContext(authContext);
}

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const { addUser } = useFireStore();

  const loginWithGoogle = async () => {
    const { error, user } = await AuthService.loginWithGoogle();
    setUser(user ?? null);
    addUser(user);
    setError(error ?? "");
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };
  const auth = { user, error, loginWithGoogle, logout, setUser };

  return <authContext.Provider value={auth} {...props} />;
}
