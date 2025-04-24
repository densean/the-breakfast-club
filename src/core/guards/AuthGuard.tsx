import { useAuthContext } from "@/core/hooks/useAuthContext";
import { Navigate, useMatchRoute } from "@tanstack/react-router";
import { PROTECTED_ROUTES } from "../rbac/protectedRoutes";
import { ROUTES } from "../rbac/role.constants";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthContext();
  const matchRoute = useMatchRoute();

  const normalizePath = (path: string) => path.replace(/\/+$/, "");

  const currentPath = normalizePath(location.pathname);
  const currentRoute = PROTECTED_ROUTES.find(
    (route) => normalizePath(route.path) === currentPath
  );

  const isAuthPage =
    matchRoute({ to: "/login" }) || matchRoute({ to: "/logout" });

  if (!currentRoute) {
    return <>{children}</>;
  }

  if (currentRoute.isPublic || isAuthPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  if (
    currentRoute.allowedRoles.length &&
    !currentRoute.allowedRoles.includes(user?.role)
  ) {
    return <Navigate to={ROUTES.UNAUTHORIZED} />;
  }

  return <>{children}</>;
}
