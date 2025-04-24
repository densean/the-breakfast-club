/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminMoviesDashboard from "./Dashboard";
import { useGetMoviesQuery } from "@/core/services/movies-admin/queries/useGetMoviesQuery";
import { Movies } from "../../dashboard/children/MovieList";

jest.mock("@tanstack/react-router", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("@/core/services/movies-admin/queries/useGetMoviesQuery", () => ({
  useGetMoviesQuery: jest.fn(),
}));
jest.mock(
  "@/core/services/movies-admin/mutations/useDeleteMovieMutation",
  () => ({
    useDeleteMovieMutation: jest.fn(() => ({ mutate: jest.fn() })),
  })
);
jest.mock(
  "@/core/services/movies-admin/mutations/useUpdateMovieMutation",
  () => ({
    useUpdateMovieMutation: jest.fn(() => ({ mutate: jest.fn() })),
  })
);

const mockMovies: Movies[] = [
  {
    id: "1",
    movieTitle: "Interstellar",
    movieDescription: "Space exploration",
    rating: 9,
    movieImgSrc: "/interstellar.jpg",
    synopsis: "A journey beyond the stars",
    child: [],
  },
  {
    id: "2",
    movieTitle: "Inception",
    movieDescription: "Dreams inside dreams",
    rating: 10,
    movieImgSrc: "/inception.jpg",
    synopsis: "Mind-bending heist",
    child: [],
  },
  {
    id: "3",
    movieTitle: "The Shawshank Redemption",
    movieDescription: "Hope",
    rating: 4.5,
    movieImgSrc: "/shawshank.jpg",
    synopsis: "A story of hope",
    child: [],
  },
];

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("AdminMoviesDashboard - Focused Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useGetMoviesQuery as jest.Mock).mockReturnValue({
      data: mockMovies,
      isLoading: false,
    });
  });

  it("should display the list of movies in the table", async () => {
    renderWithClient(<AdminMoviesDashboard />);

    const interstellarTitle = await screen.findByText("Interstellar");
    const inceptionTitle = await screen.findByText("Inception");
    const shawshankTitle = await screen.findByText("The Shawshank Redemption");

    expect(interstellarTitle).toBeInTheDocument();
    expect(inceptionTitle).toBeInTheDocument();
    expect(shawshankTitle).toBeInTheDocument();

    expect(screen.getByText("Space exploration")).toBeInTheDocument();
    expect(screen.getByText("Dreams inside dreams")).toBeInTheDocument();
    expect(screen.getByText("Hope")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("should filter movies in the table based on the search input", async () => {
    renderWithClient(<AdminMoviesDashboard />);

    const input = screen.getByPlaceholderText(/Search.../i);

    fireEvent.change(input, { target: { value: "Inception" } });

    const inceptionTitle = await screen.findByText("Inception");

    expect(inceptionTitle).toBeInTheDocument();
    expect(screen.queryByText("Interstellar")).not.toBeInTheDocument();
    expect(
      screen.queryByText("The Shawshank Redemption")
    ).not.toBeInTheDocument();
  });

  it("should display 'No movies found' message when there are no movies", async () => {
    (useGetMoviesQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

    renderWithClient(<AdminMoviesDashboard />);

    const noMoviesMessage = await screen.findByText("No movies found");

    expect(noMoviesMessage).toBeInTheDocument();
  });
});
