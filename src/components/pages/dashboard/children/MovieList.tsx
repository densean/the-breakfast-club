import { useState } from "react";
import { WebTable } from "@/components/common/table/Table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { WebButton } from "@/components/common/button/Button";
import { useNavigate } from "@tanstack/react-router";
import { useMoviesQuery } from "@/core/services/movies-member/queries/useMoviesQuery";
import { useAddBookingMutation } from "@/core/services/movies-member/mutations/useAddBookingMutation";
import WebModal from "@/components/common/modal/Modal";
import { useUpdateMovieMutation } from "@/core/services/movies-admin/mutations/useUpdateMovieMutation";

export interface Movies {
  id: string;
  movieTitle: string;
  movieDescription: string;
  movieImgSrc: string;
  rating: number;
  synopsis: string;
  child: MovieSeats[];
}

export interface MovieSeats {
  seats: Seats[];
  id: string;
  showTime: string;
}

export interface Seats {
  seatId: string;
  available: boolean;
}

export default function MovieList() {
  const { data: movies = [], isLoading } = useMoviesQuery();
  const { mutate: addBooking } = useAddBookingMutation();
  const updateMovies = useUpdateMovieMutation();
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movies | null>(null);
  const navigate = useNavigate();

  const columns: ColumnDef<Movies>[] = [
    {
      accessorKey: "movieImgSrc",
      header: "",
      cell: ({ getValue }) => {
        const imgSrc = getValue<string>();
        return imgSrc ? (
          <img
            src={imgSrc}
            alt="Movie Thumbnail"
            className="w-16 h-16 object-cover"
          />
        ) : (
          <span>No Image</span>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "movieTitle",
      header: "Title",
      cell: (info) => info.getValue(),
      enableSorting: true,
    },
    {
      accessorKey: "movieDescription",
      header: "Description",
      enableSorting: false,
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: (info) => info.getValue(),
      enableSorting: true,
    },
  ];

  const bookSeat = (movieId: string, showId: string, seatId: string) => {
    const selectedMovie = movies.find((movie) => movie.id === movieId);
    if (!selectedMovie) return;

    const movieClone = structuredClone(selectedMovie);
    const showClone = movieClone.child.find((show) => show.id === showId);
    if (!showClone) return;

    const seat = showClone.seats.find((s) => s.seatId === seatId);
    if (!seat || !seat.available) return;

    seat.available = false;

    updateMovies.mutate({
      match: { id: movieId },
      ...movieClone,
    });

    addBooking({
      id: movieClone.id,
      movieTitle: movieClone.movieTitle,
      rating: movieClone.rating,
      showId: showClone.id,
      showTime: showClone.showTime,
      seatId: seatId,
    });

    setOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#141414] to-black p-4">
      <div className="md:container mx-auto my-8">
        <h2 className="text-3xl font-bold text-white mb-8">Movies List</h2>
        <WebTable
          searchKey="movieTitle"
          columns={columns}
          data={movies}
          isLoading={isLoading}
          emptyMessage={
            <div className="h-96 bg-white content-center rounded">
              <h1>No movies found</h1>
              <p>Please add a movie to the list</p>
            </div>
          }
          actions={(row) => (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  setSelectedMovie(row);
                  setOpen(true);
                }}
              >
                View Movie
              </Button>
            </div>
          )}
        />

        {open && selectedMovie && (
          <WebModal onClose={() => setOpen(false)}>
            <h3 className="">{selectedMovie.movieTitle.toLocaleUpperCase()}</h3>
            <p className="text-sm text-gray-600">{selectedMovie.synopsis}</p>
            <p className="text-sm font-semibold">
              Rating: {selectedMovie.rating}
            </p>

            <div className="space-y-4">
              {selectedMovie.child.map((show) => (
                <div key={show.id} className="border p-3 rounded-lg">
                  <p className="font-semibold">Showtime: {show.showTime}</p>
                  <p className="font-semibold">
                    Available Seats:{" "}
                    {show.seats.filter((x) => x.available).length}
                  </p>

                  <div className="flex gap-2 flex-wrap mt-2">
                    {show.seats.map((seat, index) => (
                      <Button
                        key={seat.seatId}
                        variant={seat.available ? "default" : "destructive"}
                        onClick={() =>
                          bookSeat(selectedMovie.id, show.id, seat.seatId)
                        }
                        disabled={!seat.available}
                        className="hover:cursor-pointer"
                      >
                        {`S${index}`}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="card-redirect mt-4">
              <WebButton
                variant="solid"
                color="red"
                size="3"
                label="View Bookings"
                onClick={() => {
                  setTimeout(() => {
                    navigate({ to: "/bookingList" });
                  }, 1500);
                }}
              />
            </div>
          </WebModal>
        )}
      </div>
    </div>
  );
}
