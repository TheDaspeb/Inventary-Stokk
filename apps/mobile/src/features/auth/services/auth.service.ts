import { supabase } from "@/config/supabase";
import type { LoginSchema } from "../schemas/login.schema";

/**
 * Inicia sesión utilizando correo y contraseña.
 *
 * Supabase devuelve:
 * - session
 * - user
 *
 * La sesión contiene el access token y el refresh token.
 */
async function login(credentials: LoginSchema) {
  const email = credentials.email.trim().toLowerCase();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: credentials.password,
  });

  if (error) {
    throw error;
  }

  if (!data.session || !data.user) {
    throw new Error("No fue posible crear la sesión del usuario.");
  }

  return {
    session: data.session,
    user: data.user,
  };
}

/**
 * Cierra únicamente la sesión actual del dispositivo.
 *
 * scope: "local" evita cerrar también las sesiones
 * abiertas en otros celulares o computadores.
 */
async function logout() {
  const { error } = await supabase.auth.signOut({
    scope: "local",
  });

  if (error) {
    throw error;
  }
}

/**
 * Obtiene la sesión guardada localmente.
 *
 * Puede retornar null cuando:
 * - el usuario nunca inició sesión;
 * - la sesión fue cerrada;
 * - no existe una sesión almacenada.
 */
async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}

/**
 * Obtiene y valida el usuario actual contra
 * el servidor de autenticación de Supabase.
 *
 * A diferencia de getSession(), este método
 * realiza una petición al servidor.
 */
async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return data.user;
}

/**
 * Fuerza la renovación de la sesión actual.
 *
 * Supabase utiliza el refresh token guardado
 * para solicitar un nuevo access token.
 */
async function refreshSession() {
  const { data, error } = await supabase.auth.refreshSession();

  if (error) {
    throw error;
  }

  if (!data.session) {
    throw new Error("No fue posible renovar la sesión.");
  }

  return {
    session: data.session,
    user: data.user,
  };
}

export const authService = {
  login,
  logout,
  getSession,
  getCurrentUser,
  refreshSession,
};