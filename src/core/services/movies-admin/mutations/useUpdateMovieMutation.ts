import { Movies } from "@/components/pages/dashboard/children/MovieList";
import { axiosPut } from "@/core/interceptors/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateMovieDto = {
  match: { id: string };
} & Partial<Movies>;

export function useUpdateMovieMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMovieDto) => axiosPut("/admin/updateMovie", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["adminMovies"] });
    },
  });
}
