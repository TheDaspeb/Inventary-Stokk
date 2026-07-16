export const routes = {
  home: "/",

  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
  },

  dashboard: "/dashboard",

  products: "/products",

  inventory: "/inventory",

  categories: "/categories",

  suppliers: "/suppliers",

  profile: "/profile",

  settings: "/settings",
} as const;