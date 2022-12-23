import { createContext, useContext, useState } from "react";
import AuthService from "../services/AuthService";
import useFireStore from "./useFireStore";
import { useRouter } from "next/router";

const authContext = createContext();

export default function useAuth() {
  return useContext(authContext);
}

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const { addUser } = useFireStore();
  const router = useRouter();

  const loginWithGoogle = async () => {
    const { error, user } = await AuthService.loginWithGoogle();
    setState(user, error)
    router.push("/user");

  };
  const loginWithFacebook = async () => {
    const { error, user } = await AuthService.loginWithFacebook();
    setState(user, error)
    router.push("/user");
  };
  const setState = (user, error) => {
    setUser(user ?? null);
    addUser(user);
    setError(error ?? "");
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };
  const auth = { user, error, loginWithGoogle, loginWithFacebook, logout, setUser };

  return <authContext.Provider value={auth} {...props} />;
}
