/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useRef, useState } from "react";
import TourPortal from "./TourPortal";
import useTour, { TourStep } from "./useTour";
import TourPopover from "./TourPopover";

interface TourProps {
  active?: boolean;
  steps: TourStep[];
  onStop?: () => void;
}

const Tour = ({ active = true, steps, onStop }: TourProps) => {
  const highlightRef = useRef<HTMLDivElement>(null);
  const [displayPopover, setDisplayPopover] = useState(true);
  const {
    isTourActive,
    nextStep,
    step,
    highlight,
    stepIndex,
    stopTour,
    prevStep,
  } = useTour({
    active,
    initialIndex: 0,
    steps,
    onStop,
  });

  useEffect(() => {
    if (displayPopover) return;

    const timeout = setTimeout(() => {
      setDisplayPopover(true);
    }, 150);

    return () => clearTimeout(timeout);
  }, [displayPopover]);

  const handleOnPrevious = () => {
    setDisplayPopover(false);
    prevStep();
  };
  const handleOnNext = () => {
    setDisplayPopover(false);
    nextStep();
  };

  if (!isTourActive) return null;

  return (
    <TourPortal>
      <div className="absolute inset-0 z-10 h-screen overflow-hidden bg-black/60 mix-blend-hard-light">
        {highlight && (
          <>
            <div
              ref={highlightRef}
              style={highlight}
              className="absolute border-2 border-white bg-[gray] transition-all"
            />
            {displayPopover && (
              <TourPopover
                triggerRef={highlightRef}
                title={step.title}
                content={step.content}
                placement={step.placement ?? "top"}
                hasPrevious={stepIndex !== 0}
                hasNext={stepIndex + 1 === steps.length}
                onPrevious={handleOnPrevious}
                onNext={handleOnNext}
                onDismiss={stopTour}
              />
            )}
          </>
        )}
      </div>
    </TourPortal>
  );
};

export default Tour;
