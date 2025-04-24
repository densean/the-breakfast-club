import { useQuery } from "@tanstack/react-query";
import { axiosGet } from "@/core/interceptors/axiosInstance";
import { MyBooking } from "@/components/pages/booking-list/BookingList";

export function useMyBookingsQuery() {
  return useQuery<MyBooking[]>({
    queryKey: ["myBookings"],
    queryFn: () => axiosGet("/api/getMyBookings"),
    enabled: true,
  });
}
