import { useState } from "react";
import ProgressStepper from "../progress-stepper/ProgressStepper";
import StepperNav from "../stepper-nav/StepperNav";

export interface Step {
  description: string;
}

interface FormPageProps {
  children: React.ReactNode | ((currentStep: number) => React.ReactNode);
  formTitle: string;
  formSubTitle?: string;
  steps?: Step[];
  disableNextButton?: boolean;
  onSubmit: () => void;
}

export default function FormPage({
  children,
  formTitle,
  formSubTitle,
  steps = [],
  disableNextButton = false,
  onSubmit,
}: FormPageProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = steps.length;

  const handleClick = (direction: "next" | "back") => {
    let newStep = currentStep;
    if (direction === "next") {
      if (currentStep === totalSteps) {
        onSubmit();
        return;
      }
      newStep++;
    } else if (direction === "back") {
      newStep--;
    }

    if (newStep > 0 && newStep <= totalSteps) {
      setCurrentStep(newStep);
    }
  };

  const renderChildren = () => {
    if (typeof children === "function") {
      return children(currentStep);
    }
    return children;
  };

  return (
    <div>
      <div className="w-full h-80 bg-gradient-to-b from-gray-900 to-black text-white text-center flex flex-col items-center justify-center">
        <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold">
          {formTitle}
        </h1>
        {formSubTitle && <p>{formSubTitle}</p>}

        <ProgressStepper steps={steps} currentStep={currentStep} />
      </div>

      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-40 xl:mx-52 shadow-2xl">
        {renderChildren()}

        <StepperNav
          currentStep={currentStep}
          totalSteps={totalSteps}
          onStepChange={handleClick}
          disableNextButton={disableNextButton}
        />
      </div>
    </div>
  );
}
