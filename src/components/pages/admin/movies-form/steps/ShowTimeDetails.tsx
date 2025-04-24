import { useEffect, useState } from "react";
import { WebInput } from "@/components/common/input/Input";
import { ShowTimeDetails } from "../MoviesForm";
import { Trash } from "lucide-react";
import useFormCompletion from "@/core/hooks/useFormCompletion";

interface ShowTimeDetailsProps {
  defaultValues: ShowTimeDetails[];
  onValidChange: (isValid: boolean) => void;
  onFormDataChange: (data: ShowTimeDetails[]) => void;
}

export default function ShowTimeDetailsStep({
  defaultValues,
  onFormDataChange,
  onValidChange = () => {},
}: ShowTimeDetailsProps) {
  const { isValid, values, form } = useFormCompletion({ defaultValues });
  const [showTimes, setShowTimes] = useState<string[]>(values);

  const addShowTimeField = () => {
    setShowTimes((prev) => [...prev, ""]);
  };

  const handleDelete = (index: number) => {
    const updated = [...showTimes];
    updated.splice(index, 1);
    setShowTimes(updated);
  };

  useEffect(() => {
    const showTimeArray: string[] = values?.showTimes
      ? Object.values(values.showTimes)
      : [];

    const isFilled =
      Array.isArray(showTimeArray) && showTimeArray.every((v) => v.trim());

    onValidChange(isValid && isFilled);
    onFormDataChange(showTimeArray);
  }, [values, isValid]);

  return (
    <div className="md:px-8 px-4">
      <h2 className="text-center mb-6 mt-6">Show Time Details</h2>
      <form>
        {showTimes.map((_, index) => {
          const fieldName = `showTimes.${index}`;

          return (
            <form.Field
              key={fieldName}
              name={fieldName}
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "Showtime is required";
                  return;
                },
              }}
            >
              {(field) => (
                <div className="grid grid-cols-12 gap-3 mb-4">
                  <WebInput
                    size="3"
                    className="col-span-11"
                    label={`Showtime ${index + 1}`}
                    placeholder="e.g. 7:00 PM"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    errorMessage={field.state.meta.errors?.[0]}
                  />
                  <button
                    type="button"
                    className="col-span-1 text-red-500 mt-6"
                    onClick={() => handleDelete(index)}
                  >
                    <Trash size={16} />
                  </button>
                </div>
              )}
            </form.Field>
          );
        })}
      </form>

      <button
        type="button"
        onClick={addShowTimeField}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full"
      >
        + Add Show Time
      </button>
    </div>
  );
}
