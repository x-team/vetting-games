import clsx from "clsx";
import { useRef } from "react";
import {
  AriaPopoverProps,
  DismissButton,
  Overlay,
  usePopover,
} from "react-aria";
import { OverlayTriggerState } from "react-stately";

export interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
  state: OverlayTriggerState;
  children: React.ReactNode;
}

const Popover = ({ children, state, ...props }: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const { popoverProps, arrowProps, placement } = usePopover(
    {
      ...props,
      popoverRef,
    },
    state
  );

  return (
    <Overlay>
      <div {...popoverProps} ref={popoverRef} className="popover">
        <div
          {...arrowProps}
          data-placement={placement}
          className={clsx(
            "absolute h-12 w-12",
            "data-[placement=bottom]:bottom-full",
            "data-[placement=right]:right-full data-[placement=right]:-rotate-90",
            "data-[placement=top]:top-full data-[placement=top]:rotate-180",
            "data-[placement=left]:left-full  data-[placement=left]:rotate-90"
          )}
        >
          <div className="flex flex-col items-center">
            <div className="h-2 w-2 rounded-full bg-white" />
            <div className="h-10 w-[2px] bg-white" />
          </div>
        </div>
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
};

export default Popover;
