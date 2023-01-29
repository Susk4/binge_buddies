import React, { useEffect, useState } from "react";
import useAuth from "../hook/useAuth";
import AuthService from "../services/AuthService";
import useFireStore from "../hook/useFireStore";

export default function AuthStateChanged({ children }) {
  const { getUser } = useFireStore();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthService.waitForUser(async (userCred) => {
      if (!userCred) {
        setLoading(false);
        return;
      }
      setUser(userCred);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return children;
}
