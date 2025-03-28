import { useState } from "react";
import WebLoader from "@/components/common/loader/Loader";
import { useBookingContext } from "@/hooks/useBookingContext";
import TicketCard from "./child/TicketCard";
import BookingBanner from "./child/BookingBanner";
import EmptyBooking from "./child/EmptyBooking";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function BookingList() {
  const { bookedSeats, movies, removeBooking, updateBooking } =
    useBookingContext();
  const [isLoading, setIsLoading] = useState(false);
  const [removingSeat, setRemovingSeat] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState({
    movieId: "",
    showId: "",
    seatId: "",
  });

  const handleOpenUpdateDialog = (booking: {
    movieId: string;
    showId: string;
    seatId: string;
  }) => {
    setSelectedBooking(booking);
    setOpen(true);
  };

  const handleUpdateBooking = (newSeatId: string) => {
    if (selectedBooking) {
      updateBooking(
        selectedBooking.movieId,
        selectedBooking.showId,
        selectedBooking.seatId,
        newSeatId
      );
      setOpen(false);
    }
  };

  return (
    <div className="">
      {isLoading && <WebLoader />}
      <BookingBanner />
      {bookedSeats.length === 0 ? (
        <div className="bg-[#141414] md:px-32 py-4 text-white">
          <EmptyBooking />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 bg-[#141414] md:px-32 py-4">
          {bookedSeats.map((seat) => {
            const movie = movies.find((m) => m.id === seat.movieId);
            const show = movie?.child.find((s) => s.id === seat.showId);

            return (
              <TicketCard
                key={`${seat.movieId}-${seat.showId}-${seat.seatId}`}
                seatId={seat.seatId}
                movieTitle={movie?.movieTitle || "Unknown"}
                movieDescription={
                  movie?.movieDescription || "No description available."
                }
                movieImgSrc={movie?.movieImgSrc || "/placeholder.jpg"}
                showTime={show?.showTime || "Unknown"}
                dateOfBooking={new Date().toLocaleDateString()}
                isRemoving={removingSeat === seat.seatId}
                onCancel={() => {
                  setRemovingSeat(seat.seatId);
                  setIsLoading(true);
                  setTimeout(() => {
                    removeBooking(seat.seatId, seat.movieId, seat.showId);
                    setIsLoading(false);
                    setRemovingSeat("");
                  }, 1500);
                }}
                onUpdate={() => handleOpenUpdateDialog(seat)}
                isUpdating={false}
              />
            );
          })}
        </div>
      )}

      {selectedBooking && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-lg bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl">
                Change Seat for{" "}
                {
                  movies.find((m) => m.id === selectedBooking.movieId)
                    ?.movieTitle
                }
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {movies
                .find((m) => m.id === selectedBooking.movieId)
                ?.child.map((show) =>
                  show.id === selectedBooking.showId ? (
                    <div key={show.id} className="border p-3 rounded-lg">
                      <p className="font-semibold">Showtime: {show.showTime}</p>
                      <p className="font-semibold">
                        Available Seats:{" "}
                        {show.seats.filter((x) => x.available).length}
                      </p>

                      <div className="flex gap-2 flex-wrap mt-2">
                        {show.seats.map((seat) => (
                          <Button
                            key={seat.seatId}
                            variant={seat.available ? "default" : "destructive"}
                            onClick={() => handleUpdateBooking(seat.seatId)}
                            disabled={!seat.available}
                            className="hover:cursor-pointer"
                          >
                            {seat.seatId}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : null
                )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
