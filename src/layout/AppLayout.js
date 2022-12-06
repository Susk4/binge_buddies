import { useRouter } from "next/dist/client/router";
import React from "react";
import useAuth from "../hook/auth";

export default function AppLayout({ children }) {
  const router = useRouter();
  return <main>{children}</main>;
}
