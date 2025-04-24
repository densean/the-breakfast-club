import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPost } from "@/core/interceptors/axiosInstance";
import { MyBooking } from "@/components/pages/booking-list/BookingList";

export function useAddBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newBooking: MyBooking) =>
      axiosPost("/api/addBooking", newBooking),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["myBookings"] }),
  });
}
