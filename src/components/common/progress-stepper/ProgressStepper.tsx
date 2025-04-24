import { useEffect, useRef, useState } from "react";

interface Step {
  description: string;
  completed?: boolean;
  highlighted?: boolean;
  selected?: boolean;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export default function ProgressStepper({ steps, currentStep }: StepperProps) {
  const [newStep, setNewStep] = useState<Step[]>([]);
  const stepRef = useRef<Step[]>([]);

  const updateStep = (stepNumber: number, steps: Step[]) => {
    const newSteps = [...steps];
    for (let count = 0; count < newSteps.length; count++) {
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
      } else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
      }
    }
    return newSteps;
  };

  useEffect(() => {
    const stepState = steps.map((step, index) => ({
      ...step,
      completed: false,
      highlighted: index === 0,
      selected: index === 0,
    }));

    stepRef.current = stepState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  return (
    <div className="flex justify-between mx-auto w-full py-4">
      {newStep.map((step, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center text-teal-600 flex-1 min-w-[80px]"
        >
          <div
            className={`z-10 rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center ${
              step.selected
                ? "bg-yellow-300 text-white font-bold border-crowngold"
                : "bg-white text-black"
            }`}
          >
            {step.completed ? (
              <span className="text-white font-bold text-xl">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>

          <div
            className={`mt-4 text-xs font-medium uppercase text-center w-24 sm:w-28 ${
              step.highlighted ? "text-white" : "text-gray-400"
            }`}
          >
            {step.description}
          </div>

          {index !== newStep.length - 1 && (
            <div className="absolute top-6 left-1/2 w-full z-0">
              <div
                className={`h-0.5 translate-x-1 ${
                  newStep[index + 1].completed ? "bg-crowngold" : "bg-gray-300"
                }`}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
