import { useEffect, useState } from "react";
import axios from "axios";
import { Movies } from "@/components/pages/dashboard/children/MovieList";
import { mockMovies } from "@/core/data/movies/movies.mock";

const API_URL = "https://your-api-endpoint.com/movies"; // Replace with your API

export function useFetchMovies() {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // const response = await axios.get(API_URL);
        // setMovies(response.data);
        setLoading(true);
        setMovies(mockMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch movies");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
}
