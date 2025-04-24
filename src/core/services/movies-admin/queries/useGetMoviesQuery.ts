import { Movies } from "@/components/pages/dashboard/children/MovieList";
import { axiosGet } from "@/core/interceptors/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export function useGetMoviesQuery() {
  return useQuery<Movies[]>({
    queryKey: ["adminMovies"],
    queryFn: () => axiosGet<Movies[]>("/admin/getMoviesList"),
  });
}
