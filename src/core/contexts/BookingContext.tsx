import { Movies } from "@/components/pages/dashboard/children/MovieList";
import { createContext, ReactNode, useEffect, useState } from "react";

interface BookingContextType {
  movies: Movies[];
  bookedSeats: BookedSeats[];
  bookSeat: (movieId: string, showTimeId: string, seatId: string) => void;
  removeBooking: (seatId: string, movieId: string, showId: string) => void;
  updateBooking: (
    movieId: string,
    showTimeId: string,
    oldSeatId: string,
    newSeatId: string
  ) => void;
}

interface BookedSeats {
  movieId: string;
  seatId: string;
  showId: string;
  showTime: string;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({
  children,
  initialMovies = [],
}: {
  children: ReactNode;
  initialMovies?: Movies[];
}) => {
  const [movies, setMovies] = useState<Movies[]>(() => {
    const storedMovies = localStorage.getItem("movies");
    return storedMovies ? JSON.parse(storedMovies) : initialMovies;
  });

  const [bookedSeats, setBookedSeats] = useState<BookedSeats[]>(() => {
    const storedSeats = localStorage.getItem("bookedSeats");
    return storedSeats ? JSON.parse(storedSeats) : [];
  });

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));
  }, [bookedSeats]);

  const bookSeat = (movieId: string, showTimeId: string, seatId: string) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId
          ? {
              ...movie,
              child: movie.child.map((show) =>
                show.id === showTimeId
                  ? {
                      ...show,
                      seats: show.seats.map((seat) =>
                        seat.seatId === seatId
                          ? { ...seat, available: false }
                          : seat
                      ),
                    }
                  : show
              ),
            }
          : movie
      )
    );

    const movie = movies.find((m) => m.id === movieId);
    const show = movie?.child.find((s) => s.id === showTimeId);
    const bookedSeat = show?.seats.find((seat) => seat.seatId === seatId);

    if (bookedSeat && show) {
      const newBooking: BookedSeats = {
        movieId,
        seatId,
        showId: showTimeId,
        showTime: show.showTime,
      };
      setBookedSeats((prev) => [...prev, newBooking]);
    }
  };

  const removeBooking = (seatId: string, movieId: string, showId: string) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) => ({
        ...movie,
        child: movie.child.map((show) => ({
          ...show,
          seats: show.seats.map((seat) =>
            seat.seatId === seatId ? { ...seat, available: true } : seat
          ),
        })),
      }))
    );

    setBookedSeats((prev) =>
      prev.filter(
        (seat) =>
          seat.seatId !== seatId ||
          seat.movieId !== movieId ||
          seat.showId !== showId
      )
    );
  };

  const updateBooking = (
    movieId: string,
    showTimeId: string,
    oldSeatId: string,
    newSeatId: string
  ) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId
          ? {
              ...movie,
              child: movie.child.map((show) =>
                show.id === showTimeId
                  ? {
                      ...show,
                      seats: show.seats.map((seat) => {
                        if (seat.seatId === oldSeatId) {
                          return { ...seat, available: true };
                        }
                        if (seat.seatId === newSeatId) {
                          return { ...seat, available: false };
                        }
                        return seat;
                      }),
                    }
                  : show
              ),
            }
          : movie
      )
    );

    setBookedSeats((prevBookedSeats) =>
      prevBookedSeats.map((seat) =>
        seat.movieId === movieId &&
        seat.showId === showTimeId &&
        seat.seatId === oldSeatId
          ? { ...seat, seatId: newSeatId }
          : seat
      )
    );
  };

  return (
    <BookingContext.Provider
      value={{ movies, bookedSeats, bookSeat, removeBooking, updateBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
