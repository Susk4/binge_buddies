import React from "react";
import Navbar from "./components/Navbar";
import useAuth from "../hook/useAuth";

export default function AppLayout({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <> {children}</>;
  }
  return (
    <>
      <Navbar />
      <div className="flex-grow flex-shrink basis-0 min-h-0 flex flex-col justify-center items-center">
        {children}
      </div>
    </>
  );
}
