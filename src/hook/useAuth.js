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
  const { addUser, userExists } = useFireStore();
  const router = useRouter();

  const loginWithGoogle = async () => {
    const result= await AuthService.loginWithGoogle();
    setState(result);
  };
  const loginWithFacebook = async () => {
    const { result } = await AuthService.loginWithFacebook();
    setState(result);
  };
  const setState = async ({user, additionalUserInfo, error}) => {
    if (error) {
      setError(error);
      return;
    }
    setUser(user);


    if (additionalUserInfo.isNewUser) {
      console.log("user does not exist");
      await addUser(user);
      router.push("/user");
    } else {
      console.log("user exists");
    }
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };
  const auth = {
    user,
    error,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    setUser,
  };

  return <authContext.Provider value={auth} {...props} />;
}
