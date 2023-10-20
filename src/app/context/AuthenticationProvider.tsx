"use client";

import { SessionProvider } from "next-auth/react";

export interface AuthContextTypes {
  children: React.ReactNode;
}

export default function AuthContextProvider({ 
  children
}: AuthContextTypes) {
  return <SessionProvider>{children}</SessionProvider>;
}