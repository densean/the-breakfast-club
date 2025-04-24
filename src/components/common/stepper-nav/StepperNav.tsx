interface StepperNavProps {
  currentStep: number;
  totalSteps: number;
  onStepChange: (direction: "next" | "back") => void;
  disableNextButton?: boolean;
}

export default function StepperNav({
  currentStep,
  totalSteps,
  onStepChange,
  disableNextButton = false,
}: StepperNavProps) {
  return (
    <div className="flex h-20 p-3 md:px-12 bg-gradient-to-b from-gray-900 to-black justify-end space-x-2">
      <button
        onClick={() => onStepChange("back")}
        disabled={currentStep === 1}
        className="px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 hover:shadow-md rounded-full disabled:opacity-50"
      >
        <span className="font-medium md:px-4">Previous Page</span>
      </button>

      <button
        onClick={() => onStepChange("next")}
        disabled={disableNextButton}
        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-md rounded-full disabled:opacity-50"
      >
        <span className="font-medium md:px-4">
          {currentStep === totalSteps ? "Submit Form" : "Next Page"}
        </span>
      </button>
    </div>
  );
}
