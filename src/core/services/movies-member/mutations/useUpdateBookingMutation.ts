import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPost } from "@/core/interceptors/axiosInstance";
import { MyBooking } from "@/components/pages/booking-list/BookingList";

type UpdateBookingDto = {
  match: { id: string };
} & MyBooking;

export function useUpdateBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateBookingDto) =>
      axiosPost("/api/updateBooking", data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["myBookings"] }),
  });
}
