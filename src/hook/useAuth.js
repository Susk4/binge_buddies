import { createContext, useContext, useState } from "react";
import AuthService from "../services/AuthService";
import useFireStore from "./useFireStore";
import useTmdb from "./useTmdb";
import { useRouter } from "next/router";

const authContext = createContext();

export default function useAuth() {
  return useContext(authContext);
}

export function AuthProvider(props) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { addUser } = useFireStore();
  const { getGenres } = useTmdb();
  const router = useRouter();

  const loginWithGoogle = async () => {
    setLoading(true);
    const result = await AuthService.loginWithGoogle();
    setState(result);
    setLoading(false);
  };
  const setState = async ({ user, additionalUserInfo, error }) => {
    if (error) {
      setLoading(false);
      setError(error);
      return;
    }
    setUser(user);

    if (additionalUserInfo.isNewUser) {
      //console.log("user does not exist");

      const genresData = await getGenres();
      const genreIds = genresData.genres.map((genre) => genre.id);

      /* const providerData = await getProviders();
      const providerIds = providerData.results.map((provider) => provider.provider_id);
       */
      const filterData = {
        genres: genreIds,
        release_year: { from: 1850, to: new Date().getFullYear() },
      };
      await addUser(user, filterData);
      router.push("/user");
    } else {
      //console.log("user exists");
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
    logout,
    setUser,
    loading,
  };

  return <authContext.Provider value={auth} {...props} />;
}
