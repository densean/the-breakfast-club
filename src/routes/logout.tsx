import Logout from "@/components/pages/logout/logout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/logout")({
  component: Logout,
});
