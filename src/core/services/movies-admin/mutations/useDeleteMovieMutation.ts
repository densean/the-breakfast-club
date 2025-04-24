import { axiosDelete } from "@/core/interceptors/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteMovieMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      axiosDelete(`/admin/deleteMovie`, { params: { id } }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["adminMovies"] }),
  });
}
