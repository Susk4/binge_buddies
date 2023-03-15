import { deleteCookie, setCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import useAuth from "../hook/useAuth";
import AuthService from "../services/AuthService";
import Loading from "../../components/misc/Loading";
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
    return (
      <h1>
        <Loading />
      </h1>
    );
  }

  return children;
}
