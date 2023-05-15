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
      const genresData = await getGenres();
      const genreIds = genresData.genres.map((genre) => genre.id);

      const filterData = {
        genres: genreIds,
        release_year: { from: 1850, to: new Date().getFullYear() },
        providers: [9, 119, 337, 390, 384, 15, 8],
      };
      await addUser(user, filterData);
      router.push("/user");
    } else {
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
