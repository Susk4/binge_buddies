import { useRouter } from "next/dist/client/router";
import React from "react";
import Navbar from "./components/Navbar";
import useAuth from "../hook/useAuth";

export default function AppLayout({ children }) {
  const router = useRouter();
  const { user } = useAuth();
  const auth = useAuth();
  if (!user) {
    return <>{children}</>;
  }
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
