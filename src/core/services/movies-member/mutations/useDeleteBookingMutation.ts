import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosDelete } from "@/core/interceptors/axiosInstance";
import { MyBooking } from "@/components/pages/booking-list/BookingList";

export function useDeleteBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (movie: MyBooking) => {
      const filters = {
        id: movie.id,
        movieTitle: movie.movieTitle,
        showTime: movie.showTime,
        seatId: movie.seatId,
      };

      return axiosDelete("/api/deleteBooking", { params: filters });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["myBookings"] }),
  });
}
