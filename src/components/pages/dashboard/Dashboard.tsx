import MovieList from "./children/MovieList";
import HeroBanner from "./children/HeroBanner";

export default function Dashboard() {
  return (
    <>
      <HeroBanner />
      <MovieList />
    </>
  );
}
