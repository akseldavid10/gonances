// src/components/providers/user-provider.tsx
"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export type User = {
  username: string;
  email: string;
  initials: string;
  memberSince: string;
  authMethod: "google" | "local";
};

let currentUserRequest: Promise<User | null> | null = null;

function loadCurrentUser(): Promise<User | null> {
  if (!currentUserRequest) {
    currentUserRequest = (async () => {
      const response = await fetchWithAuth("/api/v1/users/me");
      if (!response.ok) return null;
      const data = await response.json();
      return data.user ?? null;
    })().finally(() => {
      currentUserRequest = null;
    });
  }

  return currentUserRequest;
}

type UserContextType = {
  currentUser: User | null;
  loading: boolean;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    loadCurrentUser()
      .then((user) => {
        if (active) setCurrentUser(user);
      })
      .catch(() => {
        if (active) setCurrentUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

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
