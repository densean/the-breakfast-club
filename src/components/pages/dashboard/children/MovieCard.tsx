import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import "./MovieCard.less";
import { Movies } from "@/components/pages/dashboard/children/MovieList";
import { useBookingContext } from "@/hooks/useBookingContext";
import { WebButton } from "@/components/common/button/Button";
import { useNavigate } from "@tanstack/react-router";
import WebLoader from "@/components/common/loader/Loader";

export default function MovieCard({ movie }: { movie: Movies }) {
  const { bookSeat } = useBookingContext();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Card className="w-full max-w-sm mb-4 text-white shadow-xs shadow-gray-500 rounded-xl overflow-hidden flex flex-col h-[450px] border border-gray-900 pt-0 pb-0">
        <img
          src={movie.movieImgSrc}
          alt={movie.movieTitle}
          className="w-full h-64 object-cover"
        />
        {isLoading && <WebLoader />}

        <div className="flex flex-col flex-grow px-4 pb-4">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold text-center text-white">
              {movie.movieTitle}
            </CardTitle>
            <CardDescription className="text-center text-gray-300">
              {movie.movieDescription}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-grow flex flex-col justify-between">
            <p className="text-sm text-gray-400 text-center">
              ⭐ Rating: {movie.rating}
            </p>
          </CardContent>

          <CardFooter className="mt-auto">
            <Button
              className="w-full bg-white shadow-gray-700 shadow-md hover:bg-gray-400 text-black font-semibold"
              onClick={() => setOpen(true)}
            >
              View Available Slots
            </Button>
          </CardFooter>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl">{movie.movieTitle}</DialogTitle>
            <p className="text-sm text-gray-600">{movie.synopsis}</p>
            <p className="text-sm font-semibold">Rating: {movie.rating}</p>
          </DialogHeader>
          <div className="space-y-4">
            {movie.child.map((show) => (
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
                      onClick={() => bookSeat(movie.id, show.id, seat.seatId)}
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
          <div className="card-redirect">
            <WebButton
              variant="solid"
              color="red"
              size="4"
              label="View Bookings"
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  navigate({ to: "/bookingList" });
                }, 1500);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
