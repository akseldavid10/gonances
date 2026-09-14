// src/components/providers/user-provider.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export type User = {
  username: string;
  email: string;
  initials: string;
  memberSince: string;
  authMethod: "google" | "local";
};

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
    async function loadUser() {
      try {
        const response = await fetchWithAuth("/api/v1/users/me");

        if (!response.ok) {
          setCurrentUser(null);
          return;
        }

        const data = await response.json();

        setCurrentUser(data.user);
      } catch (error) {
        console.error("Error obteniendo el usuario:", error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
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
