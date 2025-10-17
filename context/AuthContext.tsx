"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Role = "USER" | "ADMIN";

type User = {
  id: string;
  username: string;
  name: string;
  role: Role;
  processCode: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  login: (payload: { token: string; user: User }) => void;
  logout: () => void;
};

const STORAGE_KEY = "consumable-manager-auth";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, token: null });

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuthState;
        setState(parsed);
      } catch (error) {
        console.error("failed to parse auth state", error);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: state.user,
      token: state.token,
      login: ({ token, user }) => setState({ token, user }),
      logout: () => setState({ token: null, user: null })
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export function useIsAuthenticated(role?: Role) {
  const { user } = useAuth();
  if (!user) return false;
  if (!role) return true;
  return user.role === role;
}
