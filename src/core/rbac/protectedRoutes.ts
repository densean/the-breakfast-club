import { RouteConfig } from "./role.model";

export const PROTECTED_ROUTES: RouteConfig[] = [
  { path: "/", allowedRoles: ["MEMBER", "ADMIN"], isPublic: false },
  { path: "/dashboard", allowedRoles: ["MEMBER", "ADMIN"], isPublic: false },
  { path: "/admin/movies", allowedRoles: ["ADMIN"], isPublic: false },
  { path: "/admin/", allowedRoles: ["ADMIN"], isPublic: false },
];
