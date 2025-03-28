import { createFileRoute } from "@tanstack/react-router";
import BookingList from "../components/pages/booking-list/BookingList";

export const Route = createFileRoute("/bookingList")({
  component: BookingList,
});
