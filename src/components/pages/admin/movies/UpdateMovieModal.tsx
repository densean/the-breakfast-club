import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import WebModal from "@/components/common/modal/Modal";
import { WebInput } from "@/components/common/input/Input";
import { MovieDetails } from "../movies-form/MoviesForm";

interface EditMovieModalProps {
  movie: MovieDetails;
  onClose: () => void;
  onSave: (values: Partial<MovieDetails>) => void;
}

export default function EditMovieModal({
  movie,
  onClose,
  onSave,
}: EditMovieModalProps) {
  const form = useForm({
    defaultValues: {
      movieTitle: movie.movieTitle,
      movieDescription: movie.movieDescription,
      movieImgSrc: movie.movieImgSrc,
      rating: movie.rating.toString(),
      synopsis: movie.synopsis,
    },
    onSubmit: ({ value }) => {
      onSave({
        ...value,
        rating: parseFloat(value.rating),
      });
      onClose();
    },
  });

  return (
    <WebModal onClose={onClose}>
      <form onSubmit={form.handleSubmit}>
        <div className="md:px-8 px-4">
          <h2 className="text-center mb-6 mt-6">Movie Details</h2>
          <form.Field
            name="movieTitle"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "Movie title is required";
              },
            }}
          >
            {(field) => (
              <WebInput
                size="3"
                label="Movie title"
                placeholder="Enter movie title"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors[0]}
                className="mb-6"
              ></WebInput>
            )}
          </form.Field>

          <form.Field
            name="movieDescription"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "Movie description is required";
              },
            }}
          >
            {(field) => (
              <WebInput
                size="3"
                label="Movie description"
                placeholder="Enter movie description"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors[0]}
                className="mb-6"
              />
            )}
          </form.Field>

          <form.Field
            name="movieImgSrc"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "Image URL is required";
              },
            }}
          >
            {(field) => (
              <WebInput
                size="3"
                label="Image URL"
                placeholder="Enter image URL"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors[0]}
                className="mb-6"
              />
            )}
          </form.Field>

          <form.Field
            name="rating"
            validators={{
              onChange: ({ value }) => {
                if (!value || isNaN(Number(value)))
                  return "Valid rating is required";
              },
            }}
          >
            {(field) => (
              <WebInput
                size="3"
                type="number"
                label="Rating"
                placeholder="Enter rating (e.g. 4.5)"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors[0]}
                className="mb-6"
              />
            )}
          </form.Field>

          <form.Field
            name="synopsis"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "Synopsis is required";
              },
            }}
          >
            {(field) => (
              <WebInput
                size="3"
                label="Synopsis"
                placeholder="Enter movie synopsis"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors[0]}
                className="mb-6"
              />
            )}
          </form.Field>

          <div className="text-center mt-6">
            <Button
              type="submit"
              className="bg-blue-700 text-white rounded-full"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </WebModal>
  );
}
