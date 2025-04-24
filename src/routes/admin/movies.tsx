import MoviesForm from "@/components/pages/admin/movies-form/MoviesForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/movies")({
  component: MoviesForm,
});
