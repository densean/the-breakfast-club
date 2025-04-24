import FormPage, { Step } from "@/components/common/form-page/FormPage";
import { Movies } from "../../dashboard/children/MovieList";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAddMovieMutation } from "@/core/services/movies-admin/mutations/useAddMovieMutation";
import MovieDetailsStep from "./steps/MovieDetails";
import ShowTimeDetailsStep from "./steps/ShowTimeDetails";
import WebModal from "@/components/common/modal/Modal";
import WebLoader from "@/components/common/loader/Loader";
import FullPageError from "@/components/common/error-page/FullPageError";

const steps: Step[] = [
  { description: "Movie Details" },
  { description: "Show Time Details" },
];

export type MovieDetails = Omit<Movies, "child" | "id">;
export type ShowTimeDetails = string;

export interface MovieToBeAdded {
  movieDetails: MovieDetails;
  showTimeDetails: ShowTimeDetails[];
}

export default function MoviesForm() {
  const navigate = useNavigate();
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [movie, setMovie] = useState<MovieToBeAdded>({
    movieDetails: {
      movieTitle: "",
      movieDescription: "",
      movieImgSrc: "",
      rating: 0,
      synopsis: "",
    },
    showTimeDetails: [""],
  });
  const { mutate: addMovie, isPending, isError } = useAddMovieMutation();

  const handleSubmit = () => {
    const input = {
      ...movie.movieDetails,
      showTimes: movie.showTimeDetails,
    };

    addMovie(input, {
      onSuccess: () => {
        setIsModalVisible(true);
      },
      onError: (err: unknown) => {
        console.error("Failed to add movie:", err);
      },
    });
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    navigate({ to: "/admin" });
  };

  const renderStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return (
          <MovieDetailsStep
            defaultValues={{ ...movie.movieDetails } as MovieDetails}
            onValidChange={(valid) => setIsNextDisabled(!valid)}
            onFormDataChange={(data) =>
              setMovie((details) => ({
                ...details,
                movieDetails: data,
              }))
            }
          ></MovieDetailsStep>
        );
      case 2:
        return (
          <ShowTimeDetailsStep
            defaultValues={movie.showTimeDetails}
            onValidChange={(valid) => setIsNextDisabled(!valid)}
            onFormDataChange={(data) => {
              setMovie((details) => ({
                ...details,
                showTimeDetails: data,
              }));
            }}
          ></ShowTimeDetailsStep>
        );
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div>
      {isPending && <WebLoader />}

      {isError && (
        <FullPageError
          redirectLink="/admin"
          redirectMessage="Go back to admin page"
        />
      )}

      {!isError && !isPending && (
        <FormPage
          formTitle="Add a movie form"
          steps={steps}
          disableNextButton={isNextDisabled}
          onSubmit={() => handleSubmit()}
        >
          {(currentStep) => (
            <div className="bg-white p-6 shadow-xl">
              {renderStep(currentStep)}
            </div>
          )}
        </FormPage>
      )}

      {isModalVisible && (
        <WebModal onClose={handleModalClose}>
          <div className="p-6 text-center">
            <h2 className="text-2xl font-semibold">Movie added!</h2>
            <p className="my-4">Close this modal to view all movies</p>
            <button
              onClick={handleModalClose}
              className="bg-blue-500 text-white p-2 rounded-full w-full"
            >
              Close
            </button>
          </div>
        </WebModal>
      )}
    </div>
  );
}
