import { useRouter } from "next/router";
import React from "react";
import useAuth from "./useAuth";
import Loading from "../../components/misc/Loading";
export function withPublic(Component) {
  return function WithPublic(props) {
    const auth = useAuth();
    const router = useRouter();

    if (auth.user) {
      router.replace("/");
      return (
        <h1>
          <Loading />
        </h1>
      );
    }
    return <Component auth={auth} {...props} />;
  };
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const auth = useAuth();
    const router = useRouter();

    if (!auth.user) {
      router.replace("/login");
      return (
        <h1>
          <Loading />
        </h1>
      );
    }
    return <Component auth={auth} {...props} />;
  };
}
