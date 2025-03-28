import { createFileRoute } from "@tanstack/react-router";
import ErrorPage from "@/components/pages/error-page/ErrorPage";

export const Route = createFileRoute("/error")({
  component: ErrorPage,
});
