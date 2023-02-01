import { useRouter } from "next/dist/client/router";
import React from "react";
import Navbar from "./components/Navbar";
import useAuth from "../hook/useAuth";

export default function AppLayout({ children }) {
  const router = useRouter();
  const { user } = useAuth();
  const auth = useAuth();
  if (!user) {
    return (
      <div className="bg-gradient-to-t from-red-600 text-red-900">
        {children}
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-t from-red-600 text-red-900">
      <Navbar />
      {children}
    </div>
  );
}
