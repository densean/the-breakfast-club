import "./App.css";
import { Theme } from "@radix-ui/themes";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { BookingProvider } from "./core/contexts/BookingContext";
import { useFetchMovies } from "./core/hooks/useFetchMovies";
import WebLoader from "./components/common/loader/Loader";
import ErrorPage from "./components/pages/error-page/ErrorPage";
import { AuthProvider } from "./core/contexts/AuthContext";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: ErrorPage,
});

function App() {
  const { movies, loading, error } = useFetchMovies();

  if (loading) return <WebLoader></WebLoader>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Theme>
        <AuthProvider>
          <BookingProvider initialMovies={movies}>
            <RouterProvider router={router} />
          </BookingProvider>
        </AuthProvider>
      </Theme>
    </>
  );
}

export default App;
