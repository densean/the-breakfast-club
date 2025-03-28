import { useAuthContext } from "@/hooks/useAuthContext";
import { Navigate, useMatch, useMatchRoute } from "@tanstack/react-router";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthContext();
  const matchRoute = useMatchRoute();
  const match = useMatch({
    from: window.location.pathname,
    shouldThrow: false,
  });
  const isAuthPage =
    matchRoute({ to: "/login" }) || matchRoute({ to: "/logout" });
  const isNotFoundPage = !match;

  if (!isAuthPage && !isNotFoundPage) {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
  }

  return <>{children}</>;
}
