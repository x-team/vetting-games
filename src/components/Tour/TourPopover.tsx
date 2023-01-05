import CloseIcon from "@components/Icon/CloseIcon";
import Popover from "@components/Overlay/Popover";
import clsx from "clsx";
import { useOverlayTriggerState } from "react-stately";

interface TourPopoverProps {
  triggerRef: React.RefObject<Element>;
  title: string;
  content: string;
  placement?: "top" | "bottom" | "left" | "right";
  hasPrevious: boolean;
  hasNext: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onDismiss?: () => void;
}

const TourPopover = ({
  triggerRef,
  title,
  content,
  placement,
  hasPrevious,
  hasNext,
  onNext,
  onPrevious,
  onDismiss,
}: TourPopoverProps) => {
  const state = useOverlayTriggerState({ isOpen: true });

  return (
    <Popover
      offset={44}
      triggerRef={triggerRef}
      placement={placement}
      state={state}
    >
      <div className="flex w-[240px] flex-col gap-6 rounded-2xl bg-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-medium">{title}</h1>
          <CloseIcon className="w-4 cursor-pointer" onClick={onDismiss} />
        </div>
        <p className="text-small">{content}</p>
        <div className="flex justify-between">
          <button
            className={clsx(
              "text-neutral-800 text-small-bold",
              !hasPrevious && "opacity-0"
            )}
            onClick={onPrevious}
            disabled={!hasPrevious}
          >
            Previous
          </button>
          <button className="text-neutral-800 text-small-bold" onClick={onNext}>
            {hasNext ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </Popover>
  );
};

export default TourPopover;
