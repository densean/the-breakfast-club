import { nanoid } from "nanoid";
import { axiosPost } from "@/core/interceptors/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Movies,
  MovieSeats,
  Seats,
} from "@/components/pages/dashboard/children/MovieList";

type AddMovieFormInput = {
  movieTitle: string;
  movieDescription: string;
  movieImgSrc: string;
  rating: number;
  synopsis: string;
  showTimes: string[];
};

export function useAddMovieMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: AddMovieFormInput) => {
      const generateSeats = (): Seats[] =>
        Array.from({ length: 10 }, () => ({
          seatId: `S${Math.random().toString(36).substring(2, 8)}`,
          available: true,
        }));

      const showtimeChildren: MovieSeats[] = input.showTimes.map((time) => ({
        id: nanoid(),
        showTime: time,
        seats: generateSeats(),
      }));

      const newMovie: Movies = {
        id: nanoid(),
        movieTitle: input.movieTitle,
        movieDescription: input.movieDescription,
        movieImgSrc: input.movieImgSrc,
        rating: input.rating,
        synopsis: input.synopsis,
        child: showtimeChildren,
      };

      return axiosPost("/admin/addMovie", newMovie);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["adminMovies"] }),
  });
}
