import useFormCompletion from "@/core/hooks/useFormCompletion";
import { MovieDetails } from "../MoviesForm";
import { useEffect } from "react";
import { WebInput } from "@/components/common/input/Input";

interface MovieDetailsProps {
  defaultValues: MovieDetails;
  onValidChange: (isValid: boolean) => void;
  onFormDataChange: (data: MovieDetails) => void;
}

export default function MovieDetailsStep({
  defaultValues,
  onFormDataChange,
  onValidChange = () => {},
}: MovieDetailsProps) {
  const { isValid, values, form } = useFormCompletion({ defaultValues });

  useEffect(() => {
    onValidChange(isValid);
    onFormDataChange(values);
  }, [isValid, values]);

  return (
    <div className="md:px-8 px-0">
      <form>
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
                if (value > 10) {
                  return "Maximum of 10 for the rating";
                }
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
        </div>
      </form>
    </div>
  );
}
