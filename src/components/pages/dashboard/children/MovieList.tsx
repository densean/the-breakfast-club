import { useBookingContext } from "@/hooks/useBookingContext";
import MovieCard from "./MovieCard";

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
  const { movies } = useBookingContext();
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#141414] to-black p-4">
      <div className="md:container mx-auto my-8">
        <h2 className="text-3xl font-bold text-white mb-8">Movies List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
