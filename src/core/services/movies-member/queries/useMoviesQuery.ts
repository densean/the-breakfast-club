import { useQuery } from "@tanstack/react-query";
import { axiosGet } from "@/core/interceptors/axiosInstance";
import { Movies } from "@/components/pages/dashboard/children/MovieList";

export function useMoviesQuery() {
  return useQuery<Movies[]>({
    queryKey: ["movies"],
    queryFn: () => axiosGet<Movies[]>("/api/getMoviesList"),
  });
}
