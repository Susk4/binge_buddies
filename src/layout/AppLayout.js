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
      <div className="bg-gradient-to-t from-red-600 text-red-900 h-full w-full fixed top-0 left-0 flex flex-col">
        {children}
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-t from-red-600 text-red-900 h-full w-full fixed top-0 left-0 flex flex-col">
      <Navbar />
      <div className="flex-grow flex-shrink basis-0 min-h-0 flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
}
