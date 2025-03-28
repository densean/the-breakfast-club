import WebFooter from "@/components/common/footer/Footer";
import WebHeader from "@/components/common/header/Header";
import { createRootRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const matchRoute = useMatchRoute();
  const isAuthPage =
    matchRoute({ to: "/login" }) || matchRoute({ to: "/logout" });

  return (
    <React.Fragment>
      {!isAuthPage && <WebHeader />}
      <Outlet />
      {!isAuthPage && <WebFooter />}
    </React.Fragment>
  );
}
