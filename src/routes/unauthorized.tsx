import UnauthorizedPage from "@/components/pages/unauthorized/UnauthorizedPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/unauthorized")({
  component: UnauthorizedPage,
});
