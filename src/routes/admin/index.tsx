import AdminMoviesDashboard from "@/components/pages/admin/movies/Dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: AdminMoviesDashboard,
});
