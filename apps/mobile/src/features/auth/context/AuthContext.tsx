import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import type { Session, User } from "@supabase/supabase-js";

import { supabase } from "@/config/supabase";

import type { LoginSchema } from "../schemas/login.schema";
import { authService } from "../services/auth.service";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoggingIn: boolean;
  authError: string | null;
  login: (credentials: LoginSchema) => Promise<boolean>;
  logout: () => Promise<void>;
  clearAuthError: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getAuthErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return "Ocurrió un error inesperado.";
  }

  const message = error.message.toLowerCase();

  if (
    message.includes("invalid login credentials") ||
    message.includes("invalid credentials")
  ) {
    return "El correo o la contraseña son incorrectos.";
  }

  if (message.includes("email not confirmed")) {
    return "Debes confirmar tu correo antes de iniciar sesión.";
  }

  if (
    message.includes("network") ||
    message.includes("fetch") ||
    message.includes("connection")
  ) {
    return "No fue posible conectarse. Revisa tu conexión a internet.";
  }

  return "No fue posible completar la autenticación.";
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    async function initializeSession() {
      try {
        const currentSession = await authService.getSession();
        setSession(currentSession);
      } catch (error) {
        setAuthError(getAuthErrorMessage(error));
      } finally {
        setIsInitializing(false);
      }
    }

    void initializeSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setIsInitializing(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function login(credentials: LoginSchema): Promise<boolean> {
    setIsLoggingIn(true);
    setAuthError(null);

    try {
      const result = await authService.login(credentials);

      setSession(result.session);

      return true;
    } catch (error) {
      setAuthError(getAuthErrorMessage(error));

      return false;
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function logout(): Promise<void> {
    setAuthError(null);

    try {
      await authService.logout();
      setSession(null);
    } catch (error) {
      setAuthError(getAuthErrorMessage(error));
      throw error;
    }
  }

  function clearAuthError() {
    setAuthError(null);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      session,
      isAuthenticated: Boolean(session),
      isInitializing,
      isLoggingIn,
      authError,
      login,
      logout,
      clearAuthError,
    }),
    [
      session,
      isInitializing,
      isLoggingIn,
      authError,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe utilizarse dentro de un AuthProvider.",
    );
  }

  return context;
}