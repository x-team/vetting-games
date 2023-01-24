import useClientRect from "@utils/useClientRect";
import useControlledState from "@utils/useControlledState";
import useQuerySelectorObserver from "@utils/useQuerySelectorObserver";
import { useMemo, useState } from "react";

export interface TourStep {
  target: string;
  title: string;
  content: string;
  placement?: "top" | "bottom" | "left" | "right";
  highlightPadding?: number;
}

const useHighlight = (clientRect: DOMRect | null, padding: number) => {
  return useMemo(
    () =>
      clientRect
        ? {
            top: clientRect?.top - padding,
            left: clientRect?.left - padding,
            width: clientRect?.width + padding * 2,
            height: clientRect?.height + padding * 2,
          }
        : null,
    [clientRect]
  );
};

export interface TourOptions {
  initialIndex: number;
  steps: TourStep[];
  active?: boolean;
  highlightPadding?: number;

  onStop?: () => void;
}

export default function useTour({
  initialIndex,
  steps,
  active,
  highlightPadding,
  onStop,
}: TourOptions) {
  const [isTourActive, setIsTourActive] = useControlledState(active, true);
  const [currentStep, setCurrentStep] = useState(initialIndex ?? 0);
  const [currentElement, setCurrentElement] = useState<Element | null>(null);
  const step = steps[currentStep];
  const clientRect = useClientRect(currentElement);
  const highlight = useHighlight(
    clientRect,
    highlightPadding ?? step.highlightPadding ?? 0
  );

  const startTour = () => setIsTourActive(true);
  const stopTour = () => {
    setIsTourActive(false);
    onStop?.();
  };
  const nextStep = () => {
    if (currentStep + 1 >= steps.length) {
      stopTour();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };
  const prevStep = () => {
    if (currentStep - 1 < 0) {
      stopTour();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  useQuerySelectorObserver(step?.target, (element) => {
    setCurrentElement(element);
  });

  return {
    isTourActive,
    startTour,
    stopTour,
    nextStep,
    prevStep,
    step,
    stepIndex: currentStep,
    highlight,
  };
}
