import { useState } from "react";

import type { LoginSchema } from "../schemas/login.schema";
import { authService } from "../services/auth.service";

function getLoginErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return "Ocurrió un error inesperado. Inténtalo nuevamente.";
  }

  const message = error.message.toLowerCase();

  if (
    message.includes("invalid login credentials") ||
    message.includes("invalid credentials")
  ) {
    return "El correo o la contraseña son incorrectos.";
  }

  if (message.includes("email not confirmed")) {
    return "Debes confirmar tu correo electrónico antes de iniciar sesión.";
  }

  if (
    message.includes("network") ||
    message.includes("fetch") ||
    message.includes("connection")
  ) {
    return "No fue posible conectarse. Revisa tu conexión a internet.";
  }

  return "No fue posible iniciar sesión. Inténtalo nuevamente.";
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(credentials: LoginSchema) {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authService.login(credentials);

      return result;
    } catch (error: unknown) {
      const message = getLoginErrorMessage(error);

      setError(message);

      return null;
    } finally {
      setIsLoading(false);
    }
  }

  function clearError() {
    setError(null);
  }

  return {
    login,
    isLoading,
    error,
    clearError,
  };
}