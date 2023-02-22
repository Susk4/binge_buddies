import React, { useEffect, useState } from "react";
import useAuth from "../hook/useAuth";
import AuthService from "../services/AuthService";
import { setCookie, deleteCookie } from "cookies-next";

export default function AuthStateChanged({ children }) {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthService.waitForUser(async (userCred) => {
      if (!userCred) {
        setLoading(false);
        deleteCookie("uid");
        return;
      }
      setUser(userCred);
      setCookie("uid", userCred.uid);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <h1>Page is loading...</h1>;
  }

  return children;
}
