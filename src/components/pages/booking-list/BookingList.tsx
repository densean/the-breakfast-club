import { useState } from "react";
import { WebTable } from "@/components/common/table/Table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { WebButton } from "@/components/common/button/Button";
import { useNavigate } from "@tanstack/react-router";
import { useMyBookingsQuery } from "@/core/services/movies-member/queries/useMyBookingsQuery";
import { useDeleteBookingMutation } from "@/core/services/movies-member/mutations/useDeleteBookingMutation";
import { useUpdateBookingMutation } from "@/core/services/movies-member/mutations/useUpdateBookingMutation";
import { useUpdateMovieMutation } from "@/core/services/movies-admin/mutations/useUpdateMovieMutation";
import { useGetMoviesQuery } from "@/core/services/movies-admin/queries/useGetMoviesQuery";
import WebModal from "@/components/common/modal/Modal";
import BookingBanner from "./child/BookingBanner";
import { MovieSeats, Seats } from "../dashboard/children/MovieList";

export interface MyBooking {
  id: string;
  movieTitle: string;
  rating: number;
  showId: string;
  showTime: string;
  seatId: string;
}

export default function BookingList() {
  const { data: bookings = [], isLoading } = useMyBookingsQuery();
  const { data: movies = [] } = useGetMoviesQuery();
  const { mutate: deleteBooking } = useDeleteBookingMutation();
  const { mutate: updateBooking } = useUpdateBookingMutation();
  const { mutate: updateMovie } = useUpdateMovieMutation();

  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<MyBooking | null>(
    null
  );
  const navigate = useNavigate();

  const columns: ColumnDef<MyBooking>[] = [
    {
      accessorKey: "movieTitle",
      header: "Movie Title",
      cell: (info) => info.row.original.movieTitle,
      enableSorting: true,
    },
    {
      accessorKey: "showTime",
      header: "Showtime",
    },
    {
      accessorKey: "seatId",
      header: "Seat",
    },
    {
      accessorKey: "movie.rating",
      header: "Rating",
      cell: (info) => info.row.original.rating,
    },
  ];

  const handleDelete = (booking: MyBooking) => {
    const { id: movieId, seatId, showId } = booking;

    deleteBooking(booking, {
      onSuccess: () => {
        if (!movies) return;

        const selectedMovie = movies.find((movie) => movie.id === movieId);
        if (!selectedMovie) return;

        const movieClone = structuredClone(selectedMovie);

        const show = movieClone.child.find((s) => s.id === showId);
        if (!show) return;

        const seat = show.seats.find((s) => s.seatId === seatId);
        if (!seat) return;

        seat.available = true;

        updateMovie({
          match: { id: movieId },
          ...movieClone,
        });
      },
    });
  };

  const updateSeat = (movieId: string, newSeatId: string) => {
    if (!selectedBooking) return;

    const movie = movies.find((m) => m.id === movieId);
    if (!movie) return;

    const oldSeatId = selectedBooking.seatId;

    const updatedMovie = {
      ...movie,
      child: movie.child.map((show) => ({
        ...show,
        seats: show.seats.map((seat) => {
          if (seat.seatId === newSeatId) {
            return { ...seat, available: false };
          }
          if (seat.seatId === oldSeatId) {
            return { ...seat, available: true };
          }
          return seat;
        }),
      })),
    };

    updateMovie({ match: { id: movieId }, ...updatedMovie });

    updateBooking({
      match: { id: selectedBooking.id },
      ...selectedBooking,
      seatId: newSeatId,
    });

    setOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#141414] to-black p-4">
      <BookingBanner />
      <div className="md:container mx-auto my-8">
        <h2 className="text-3xl font-bold text-white mb-8">My Bookings</h2>
        <WebTable
          columns={columns}
          data={bookings}
          isLoading={isLoading}
          emptyMessage={
            <div className="h-96 bg-white content-center rounded">
              <h1>No bookings found</h1>
              <p>Please add a movie to the list</p>
              <WebButton
                variant="solid"
                color="red"
                size="3"
                label="Go to Movies"
                onClick={() => navigate({ to: "/dashboard" })}
              />
            </div>
          }
          actions={(row) => (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  setSelectedBooking(row);
                  setOpen(true);
                }}
              >
                Update Seat
              </Button>
              <Button
                variant="destructive"
                className="rounded-full bg-red-500 text-white"
                onClick={() => handleDelete(row)}
              >
                Delete
              </Button>
            </div>
          )}
        />

        {open && selectedBooking && (
          <WebModal onClose={() => setOpen(false)}>
            <h3 className="text-xl font-semibold">
              {selectedBooking.movieTitle.toUpperCase()}
            </h3>
            <p className="text-sm font-semibold">
              Rating: {selectedBooking.rating}
            </p>

            <div className="space-y-4 mt-4">
              <p className="font-semibold">
                Current Seat:{selectedBooking.seatId}
              </p>

              <div className="w-full">
                {movies
                  .find((m) => m.id === selectedBooking.id)
                  ?.child.map((show: MovieSeats) => (
                    <div key={show.id} className="border p-3 rounded-lg">
                      <p className="font-semibold">Showtime: {show.showTime}</p>
                      <p className="font-semibold">
                        Available Seats:{" "}
                        {show.seats.filter((x: Seats) => x.available).length}
                      </p>

                      <div className="flex gap-2 flex-wrap mt-2">
                        {show.seats.map((seat: Seats) => (
                          <Button
                            key={seat.seatId}
                            variant={
                              seat.seatId === selectedBooking.seatId
                                ? "secondary"
                                : seat.available
                                  ? "default"
                                  : "destructive"
                            }
                            onClick={() =>
                              updateSeat(selectedBooking.id, seat.seatId)
                            }
                            disabled={!seat.available}
                            className="hover:cursor-pointer"
                          >
                            {seat.seatId}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="card-redirect mt-6">
              <WebButton
                variant="solid"
                color="red"
                size="3"
                label="Go to Movies"
                onClick={() => navigate({ to: "/dashboard" })}
              />
            </div>
          </WebModal>
        )}
      </div>
    </div>
  );
}
