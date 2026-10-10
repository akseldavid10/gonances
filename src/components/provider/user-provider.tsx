// src/components/providers/user-provider.tsx
"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import type { CurrencyCode } from "@/lib/currencies";

export type User = {
  username: string;
  email: string;
  initials: string;
  memberSince: string;
  authMethod: "google" | "local";
  currency: CurrencyCode;
  avatarUrl?: string | null;
};

type UserContextType = {
  currentUser: User | null;
  loading: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: User;
}) {
  const [currentUser, setCurrentUser] = useState<User | null>(initialUser);
  const loading = false;

  return (
    <UserContext.Provider
      value={{
        currentUser,
        loading,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useCurrentUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useCurrentUser debe usarse dentro de UserProvider");
  }

  return context;
}
