import { createContext, useContext, useState } from "react";
import AuthService from "../services/AuthService";

const authContext = createContext();

export default function useAuth() {
  return useContext(authContext);
}

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  
  // Start listing users from the beginning, 1000 at a time.
  
  

  const loginWithGoogle = async () => {
    const { error, user } = await AuthService.loginWithGoogle();
    setUser(user ?? null);
    setError(error ?? "");
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };
  const auth = { user , error, loginWithGoogle, logout, setUser };

  return <authContext.Provider value={auth} {...props} />;
}